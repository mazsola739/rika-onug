import { makeAutoObservable } from 'mobx'

class AssassinStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default AssassinStore
export const assassinStore = new AssassinStore()
