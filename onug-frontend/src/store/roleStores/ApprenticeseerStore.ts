import { makeAutoObservable } from 'mobx'

class ApprenticeseerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default ApprenticeseerStore
export const apprenticeseerStore = new ApprenticeseerStore()
