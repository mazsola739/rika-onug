import { makeAutoObservable } from 'mobx'

class CopycatStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default CopycatStore
export const copycatStore = new CopycatStore()
