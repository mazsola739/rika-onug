import { makeAutoObservable } from 'mobx'

class DoppelgangerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default DoppelgangerStore
export const doppelgangerStore = new DoppelgangerStore()
