import { makeAutoObservable } from 'mobx'

class DiseasedStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default DiseasedStore
export const diseasedStore = new DiseasedStore()
