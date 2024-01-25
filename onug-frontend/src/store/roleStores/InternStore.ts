import { makeAutoObservable } from 'mobx'

class InternStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default InternStore
export const internStore = new InternStore()
