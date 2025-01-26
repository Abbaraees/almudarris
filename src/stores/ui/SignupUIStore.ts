import { makeAutoObservable } from 'mobx'

export class SignupUIStore {
  schoolName = ''
  teacherName = ''
  username = ''
  className = ''
  password = ''
  confirmPassword = ''
  enablePassword = false

  constructor() {
    makeAutoObservable(this)
  }


  signup = () => {
    console.warn("Creating New Account")
  }

  setSchoolName = (name: string) => this.schoolName = name
  setTeacherName = (name: string) => this.teacherName = name
  setUsername = (name: string) => this.username = name
  setClassName = (name: string) => this.className = name
  setPassword = (password: string) => this.password = password
  setConfirmPassword = (password: string) => this.confirmPassword = password
  togglePassword = () => this.enablePassword = !this.enablePassword
}