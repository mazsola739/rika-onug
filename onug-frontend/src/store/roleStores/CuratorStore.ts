import { makeAutoObservable } from 'mobx'

class CuratorStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default CuratorStore
export const curatorStore = new CuratorStore()
