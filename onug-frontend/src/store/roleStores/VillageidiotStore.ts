import { makeAutoObservable } from 'mobx'

class VillageidiotStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default VillageidiotStore
export const villageidiotStore = new VillageidiotStore()
