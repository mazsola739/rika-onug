import { makeAutoObservable } from 'mobx'

class InstigatorStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default InstigatorStore
export const instigatorStore = new InstigatorStore()
