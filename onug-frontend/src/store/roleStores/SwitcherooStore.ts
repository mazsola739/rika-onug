import { makeAutoObservable } from 'mobx'
class SwitcherooStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default SwitcherooStore
export const switcherooStore = new SwitcherooStore()
