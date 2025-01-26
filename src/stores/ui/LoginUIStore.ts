import { makeAutoObservable } from 'mobx'

export class LoginUIStore {

  password = ''
  loginSuccess = false
  loginError = false
  errorMessage = ''
 

  constructor() {
    makeAutoObservable(this)
  }


  login = () => {
    if (this.password.length < 8) {
      this.errorMessage = 'Incorrect Password'
      this.loginError = true

      return
    }

    this.loginSuccess = true
  }

  clearError = () => {
    this.errorMessage = ''
    this.loginError = false
  }


  setPassword = (password: string) => this.password = password

}