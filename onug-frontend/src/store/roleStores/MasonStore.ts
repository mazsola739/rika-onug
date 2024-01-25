import { makeAutoObservable } from 'mobx'

class MasonStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default MasonStore
export const masonStore = new MasonStore()
