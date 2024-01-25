import { makeAutoObservable } from 'mobx'

class BlobStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default BlobStore
export const blobStore = new BlobStore()
