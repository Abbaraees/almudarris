import { makeAutoObservable } from 'mobx'
import authStore from '../AuthStore'
import { router } from 'expo-router'

export class SignupUIStore {
  schoolName = ''
  teacherName = ''
  email = ''
  className = ''
  password = ''
  confirmPassword = ''
  enablePassword = false
  errorMessage = ''
  signupError = false

  constructor() {
    makeAutoObservable(this)
  }


  signup = async () => {
    const success = await authStore.signUp(this.email, this.password, this.teacherName, this.className, this.schoolName)
    if (success) {
      await authStore.login(this.email, this.password)
      router.replace('/(tabs)')
    } else {
      this.signupError = true
      this.errorMessage = authStore.errorMessage
    }
  }

  clearError = () => {
    this.errorMessage = ''
    this.signupError = false
  }

  setSchoolName = (name: string) => this.schoolName = name
  setTeacherName = (name: string) => this.teacherName = name
  setEmail = (email: string) => this.email = email
  setClassName = (name: string) => this.className = name
  setPassword = (password: string) => this.password = password
  setConfirmPassword = (password: string) => this.confirmPassword = password
  togglePassword = () => this.enablePassword = !this.enablePassword
}