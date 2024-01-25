import { makeAutoObservable } from 'mobx'
class LoverStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default LoverStore
export const loverStore = new LoverStore()
