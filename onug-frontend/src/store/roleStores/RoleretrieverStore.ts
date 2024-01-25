import { makeAutoObservable } from 'mobx'
class RoleretrieverStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RoleretrieverStore
export const roleretrieverStore = new RoleretrieverStore()
