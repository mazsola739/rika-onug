import { makeAutoObservable } from 'mobx'

class AnnoyingladStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default AnnoyingladStore
export const annoyingladStore = new AnnoyingladStore()
