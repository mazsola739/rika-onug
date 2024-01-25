import { makeAutoObservable } from 'mobx'

class NostradamusStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default NostradamusStore
export const nostradamusStore = new NostradamusStore()
