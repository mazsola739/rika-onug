import { makeAutoObservable } from 'mobx'

class MasonsStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default MasonsStore
export const masonsStore = new MasonsStore()
