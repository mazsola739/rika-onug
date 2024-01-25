import { makeAutoObservable } from 'mobx'
class PsychicStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default PsychicStore
export const psychicStore = new PsychicStore()
