import { makeAutoObservable } from 'mobx'

class CupidStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default CupidStore
export const cupidStore = new CupidStore()
