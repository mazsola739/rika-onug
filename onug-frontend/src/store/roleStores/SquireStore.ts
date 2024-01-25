import { makeAutoObservable } from 'mobx'
class SquireStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default SquireStore
export const squireStore = new SquireStore()
