import { makeAutoObservable } from 'mobx'

class AlphawolfStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default AlphawolfStore
export const alphawolfStore = new AlphawolfStore()
