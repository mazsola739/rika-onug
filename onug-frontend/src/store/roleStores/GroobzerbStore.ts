import { makeAutoObservable } from 'mobx'

class GroobzerbStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default GroobzerbStore
export const groobzerbStore = new GroobzerbStore()
