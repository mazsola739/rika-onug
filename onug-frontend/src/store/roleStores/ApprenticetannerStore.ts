import { makeAutoObservable } from 'mobx'

class ApprenticetannerStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default ApprenticetannerStore
export const apprenticetannerStore = new ApprenticetannerStore()
