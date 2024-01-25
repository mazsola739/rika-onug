import { makeAutoObservable } from 'mobx'

class MarksmanStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default MarksmanStore
export const marksmanStore = new MarksmanStore()
