import { makeAutoObservable } from 'mobx'

class MinionStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default MinionStore
export const minionStore = new MinionStore()
