import { makeAutoObservable } from 'mobx'

class GremlinStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default GremlinStore
export const gremlinStore = new GremlinStore()
