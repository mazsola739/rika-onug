import { makeAutoObservable } from 'mobx'

class AlienStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default AlienStore
export const alienStore = new AlienStore()
