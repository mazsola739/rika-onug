import { makeAutoObservable } from 'mobx'

class PriestStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default PriestStore
export const priestStore = new PriestStore()
