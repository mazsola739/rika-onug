import { makeAutoObservable } from 'mobx'

class SupervillainsStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default SupervillainsStore
export const supervillainsStore = new SupervillainsStore()
