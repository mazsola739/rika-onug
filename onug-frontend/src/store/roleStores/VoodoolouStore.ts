import { makeAutoObservable } from 'mobx'

class VoodoolouStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default VoodoolouStore
export const voodoolouStore = new VoodoolouStore()
