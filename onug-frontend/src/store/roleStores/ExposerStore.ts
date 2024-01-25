import { makeAutoObservable } from 'mobx'

class ExposerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default ExposerStore
export const exposerStore = new ExposerStore()
