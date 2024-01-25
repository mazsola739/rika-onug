import { makeAutoObservable } from 'mobx'

class MorticianStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default MorticianStore
export const morticiansStore = new MorticianStore()
