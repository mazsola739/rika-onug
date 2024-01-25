import { makeAutoObservable } from 'mobx'

class DetectorStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default DetectorStore
export const detectorStore = new DetectorStore()
