import { makeAutoObservable } from 'mobx'
class TemptressStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default TemptressStore
export const temptressStore = new TemptressStore()
