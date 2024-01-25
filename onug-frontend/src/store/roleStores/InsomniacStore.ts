import { makeAutoObservable } from 'mobx'

class InsomniacStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default InsomniacStore
export const insomniacStore = new InsomniacStore()
