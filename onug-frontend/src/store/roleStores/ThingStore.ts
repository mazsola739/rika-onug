import { makeAutoObservable } from 'mobx'

class ThingStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default ThingStore
export const thingStore = new ThingStore()
