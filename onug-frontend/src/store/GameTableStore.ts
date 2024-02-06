import { makeAutoObservable } from 'mobx'
import { CardType } from 'types'
import { hasMarkIds } from 'constant'
import { utils } from 'utils'
import { deckStore } from 'store'

const { areAnyCardSelectedById, checkCardPresence } = utils

export class GameTableStore {
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
    return areAnyCardSelectedById(this.selectedCards, hasMarkIds)
  }
}

export default GameTableStore
export const gameTableStore = new GameTableStore()
