import { makeAutoObservable } from 'mobx'

class RobberStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RobberStore
export const robberStore = new RobberStore()
