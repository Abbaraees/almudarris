import { Session } from "@supabase/supabase-js";
import { makeAutoObservable } from "mobx";

import { Tables } from "~/types";
import { supabase } from "~/utils/supabase";

class AuthStore {
  session: Session | null = null;
  profile: Tables<"profiles"> | null | undefined = undefined;
  authError = false;
  errorMessage = '';
  isAuthenticating = false;

  constructor() {
    makeAutoObservable(this);
    supabase.auth.onAuthStateChange((event, session) => {
      this.session = session;
      this.loadProfile();
    });
  }

  async login(email: string, password: string) {
    // Login logic here
    this.isAuthenticating = true;
    const { data, error } = await supabase.auth.signInWithPassword({email, password});
    this.isAuthenticating = false;
    if (error) {
      this.authError = true;
      this.errorMessage = error.message;
      return false
    } else {
      this.session = data.session;
      return true
    }
  }

  async signUp(
    email: string,
    password: string,
    full_name: string,
    class_name: string,
    school_name: string
  ) {
    // Sign up logic here
    this.isAuthenticating = true;
    const { data, error } = await supabase.auth.signUp({email, password});
    this.isAuthenticating = false;
    if (error) {
      this.authError = true;
      this.errorMessage = error.message;
      return false
    } else {
      this.session = data.session;
      await supabase.auth.signInWithPassword({email, password});
      await supabase
        .from('profiles')
        .update({ full_name, class_name, school_name, username: email })
        .eq('id', data.session?.user.id ?? '')
        .select()
      this.loadProfile();

      return true
    }
  }

  async loadProfile() {
    // Load profile logic here
    if (this.session) {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', this.session.user.id)
        .single();
      if (error) {
        this.profile = null;
      } else {
        this.authError = false;
        this.profile = data;
      }
      console.log("Profile", data)
    }

  }
}

const authStore = new AuthStore();
export default authStore;