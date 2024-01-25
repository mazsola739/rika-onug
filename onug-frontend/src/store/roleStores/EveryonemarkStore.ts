import { makeAutoObservable } from 'mobx'

class EveryonemarkStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default EveryonemarkStore
export const everyonemarkStore = new EveryonemarkStore()
