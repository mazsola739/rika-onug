import { makeAutoObservable } from 'mobx'
class OracleStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default OracleStore
export const oracleStore = new OracleStore()
