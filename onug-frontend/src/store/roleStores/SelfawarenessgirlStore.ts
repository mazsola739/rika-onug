import { makeAutoObservable } from 'mobx'
class SelfawarenessgirlStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default SelfawarenessgirlStore
export const selfawarenessgirlStore = new SelfawarenessgirlStore()
