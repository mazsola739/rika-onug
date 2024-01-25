import { makeAutoObservable } from 'mobx'

class WerewolvesStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default WerewolvesStore
export const werewolvesStore = new WerewolvesStore()
