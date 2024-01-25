import { makeAutoObservable } from 'mobx'

class MirrormanStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default MirrormanStore
export const mirrormanStore = new MirrormanStore()
