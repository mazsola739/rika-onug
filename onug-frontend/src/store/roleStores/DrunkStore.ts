import { makeAutoObservable } from 'mobx'

class DrunkStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default DrunkStore
export const drunkStore = new DrunkStore()
