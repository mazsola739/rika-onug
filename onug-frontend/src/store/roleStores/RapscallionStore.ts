import { makeAutoObservable } from 'mobx'

class RapscallionStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RapscallionStore
export const rapscallionStore = new RapscallionStore()
