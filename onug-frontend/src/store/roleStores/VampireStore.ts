import { makeAutoObservable } from 'mobx'

class VampireStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default VampireStore
export const vampireStore = new VampireStore()
