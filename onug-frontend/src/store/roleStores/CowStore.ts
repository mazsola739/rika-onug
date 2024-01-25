import { makeAutoObservable } from 'mobx'
class CowStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default CowStore
export const cowStore = new CowStore()
