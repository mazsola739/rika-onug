import { makeAutoObservable } from 'mobx'

class RippleStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RippleStore
export const rippleStore = new RippleStore()
