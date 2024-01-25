import { makeAutoObservable } from 'mobx'

class ApprenticeassassinStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default ApprenticeassassinStore
export const apprenticeassassinStore = new ApprenticeassassinStore()
