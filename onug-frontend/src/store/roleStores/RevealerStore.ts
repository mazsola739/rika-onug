import { makeAutoObservable } from 'mobx'

class RevealerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default RevealerStore
export const revealerStore = new RevealerStore()
