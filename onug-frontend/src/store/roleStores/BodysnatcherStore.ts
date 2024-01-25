import { makeAutoObservable } from 'mobx'

class BodysnatcherStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default BodysnatcherStore
export const bodysnatcherStore = new BodysnatcherStore()
