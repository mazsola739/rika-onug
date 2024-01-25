import { makeAutoObservable } from 'mobx'

class EmpathStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default EmpathStore
export const empathStore = new EmpathStore()
