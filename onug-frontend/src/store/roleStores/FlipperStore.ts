import { makeAutoObservable } from 'mobx'
class FlipperStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default FlipperStore
export const flipperStore = new FlipperStore()
