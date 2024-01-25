import { makeAutoObservable } from 'mobx'

class SentinelStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default SentinelStore
export const sentinelStore = new SentinelStore()
