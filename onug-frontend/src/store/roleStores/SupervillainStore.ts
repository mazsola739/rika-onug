import { makeAutoObservable } from 'mobx'

class SupervillainStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default SupervillainStore
export const supervillainStore = new SupervillainStore()
