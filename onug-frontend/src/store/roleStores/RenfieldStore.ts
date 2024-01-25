import { makeAutoObservable } from 'mobx'

class RenfieldStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RenfieldStore
export const renfieldStore = new RenfieldStore()
