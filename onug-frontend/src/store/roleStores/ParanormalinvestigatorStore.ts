import { makeAutoObservable } from 'mobx'

class ParanormalinvestigatorStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default ParanormalinvestigatorStore
export const paranormalinvestigatorStore = new ParanormalinvestigatorStore()
