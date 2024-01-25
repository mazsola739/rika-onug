import { makeAutoObservable } from 'mobx'

class MadscientistStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default MadscientistStore
export const madscientistStore = new MadscientistStore()
