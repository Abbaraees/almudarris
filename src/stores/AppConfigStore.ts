import { makeAutoObservable } from "mobx";

class AppConfigStore {
  accountExists = false
  skipOnboarding = false
  username = ''
  fullname = ''

  constructor() {
    makeAutoObservable(this)
  }

  checkAccount = async () => {
  }

  initialize = () => {
    this.accountExists = true
    this.username = 'abbaraees'
    this.fullname = 'Muhammad Lawal'

  }

  diableOnboarding = () => this.skipOnboarding = true


}

const appConfig = new AppConfigStore()
export default appConfig