import { makeAutoObservable } from 'mobx'

class EveryonecardStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default EveryonecardStore
export const everyonecardStore = new EveryonecardStore()
