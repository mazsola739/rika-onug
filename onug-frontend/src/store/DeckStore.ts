import { makeAutoObservable } from 'mobx'

class DeckStore {
  constructor() {
    makeAutoObservable(this)
  }
}

export default DeckStore
export const deckStore = new DeckStore()
