import { makeAutoObservable } from 'mobx'

class TroublemakerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default TroublemakerStore
export const troublemakerStore = new TroublemakerStore()
