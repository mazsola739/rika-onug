import { makeAutoObservable } from 'mobx'
class ThecountStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default ThecountStore
export const thecountStore = new ThecountStore()
