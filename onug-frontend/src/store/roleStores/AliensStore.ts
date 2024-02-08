import { makeAutoObservable } from 'mobx'

class AliensStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default AliensStore
export const aliensStore = new AliensStore()
