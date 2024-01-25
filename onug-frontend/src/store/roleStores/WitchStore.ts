import { makeAutoObservable } from 'mobx'

class WitchStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default WitchStore
export const witchStore = new WitchStore()
