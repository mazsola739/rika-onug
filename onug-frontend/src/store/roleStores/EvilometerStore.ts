import { makeAutoObservable } from 'mobx'

class EvilometerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default EvilometerStore
export const evilometerStore = new EvilometerStore()
