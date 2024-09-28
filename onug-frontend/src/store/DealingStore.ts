import { HAS_MARK_IDS } from 'constant'
import { makeAutoObservable } from 'mobx'
import { CardType } from 'types'
import { checkCardPresence, areAnyCardSelectedById } from 'utils'
import { deckStore } from './DeckStore'

export class DealingStore {
  constructor() {
    makeAutoObservable(this)
  }

  get totalPlayers(): number {
    return deckStore.totalPlayers
  }

  get selectedCards(): CardType[] {
    return deckStore.selectedCards
  }

  get hasDoppelganger(): boolean {
    return checkCardPresence(this.selectedCards, 1)
  }

  get hasAlphaWolf(): boolean {
    return checkCardPresence(this.selectedCards, 17)
  }

  get hasCurator(): boolean {
    return checkCardPresence(this.selectedCards, 20)
  }

  get hasSentinel(): boolean {
    return checkCardPresence(this.selectedCards, 25)
  }

  get hasTemptress(): boolean {
    return checkCardPresence(this.selectedCards, 69)
  }

  get hasMarks(): boolean {
    return areAnyCardSelectedById(this.selectedCards, HAS_MARK_IDS)
  }
}

export default DealingStore
export const dealingStore = new DealingStore()
