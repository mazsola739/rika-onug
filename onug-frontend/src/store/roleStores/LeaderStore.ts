import { makeAutoObservable } from 'mobx'

class LeaderStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default LeaderStore
export const leaderStore = new LeaderStore()
