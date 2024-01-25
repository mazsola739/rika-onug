import { makeAutoObservable } from 'mobx'

class PickpocketStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default PickpocketStore
export const pickpocketStore = new PickpocketStore()
