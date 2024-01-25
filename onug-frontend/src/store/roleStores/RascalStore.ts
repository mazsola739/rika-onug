import { makeAutoObservable } from 'mobx'

class RascalStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RascalStore
export const rascalStore = new RascalStore()
