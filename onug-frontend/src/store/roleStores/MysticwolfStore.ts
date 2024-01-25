import { makeAutoObservable } from 'mobx'

class MysticwolfStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default MysticwolfStore
export const mysticwolfStore = new MysticwolfStore()
