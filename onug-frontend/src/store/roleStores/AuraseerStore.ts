import { makeAutoObservable } from 'mobx'

class AuraseerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default AuraseerStore
export const auraseerStore = new AuraseerStore()
