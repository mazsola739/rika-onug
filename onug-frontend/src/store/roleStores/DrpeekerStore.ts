import { makeAutoObservable } from 'mobx'

class DrpeekerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default DrpeekerStore
export const drpeekerStore = new DrpeekerStore()
