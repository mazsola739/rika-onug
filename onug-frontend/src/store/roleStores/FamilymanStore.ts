import { makeAutoObservable } from 'mobx'

class FamilymanStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default FamilymanStore
export const familymanStore = new FamilymanStore()
