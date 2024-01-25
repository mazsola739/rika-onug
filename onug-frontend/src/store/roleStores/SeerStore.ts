import { makeAutoObservable } from 'mobx'
class SeerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default SeerStore
export const seerStore = new SeerStore()
