import { makeAutoObservable } from 'mobx'

class BeholderStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default BeholderStore
export const beholderStore = new BeholderStore()
