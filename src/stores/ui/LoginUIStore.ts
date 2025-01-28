import { makeAutoObservable } from 'mobx'
import authStore from '../AuthStore'
import { router } from 'expo-router'

export class LoginUIStore {

  authStore = authStore
  email = ''
  password = ''
  loginSuccess = false
  loginError = false
  errorMessage = ''
 

  constructor() {
    makeAutoObservable(this)
    this.loginError = authStore.authError
    this.errorMessage = authStore.errorMessage
  }


  login = async () => {
    this.clearError()
    const success = await authStore.login(this.email, this.password)
    if (success) {
      this.loginSuccess = true
      router.replace('/(tabs)')
    } else {
      this.loginError = true
      this.errorMessage = authStore.errorMessage
    }
  }

  clearError = () => {
    this.errorMessage = ''
    this.loginError = false
  }


  setPassword = (password: string) => this.password = password
  setEmail = (email: string) => this.email = email

}