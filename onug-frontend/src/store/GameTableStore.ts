import { makeAutoObservable } from 'mobx'
import { BoardCardType, CardType, PlayersType } from 'types'
import { selectedDeckStore } from 'store'
import { hasMarkIds } from 'constant'
import { utils } from 'utils'

const { areAnyCardSelectedById, checkCardPresence } = utils

export class GameTableStore {
  players: PlayersType[]
  boardCards: BoardCardType[]

  constructor() {
    makeAutoObservable(this)

    this.setPlayers = this.setPlayers.bind(this)
    this.setBoardCards = this.setBoardCards.bind(this)
  }

  get totalPlayers(): number {
    return selectedDeckStore.totalPlayers
  }

  get selectedCards(): CardType[] {
    return selectedDeckStore.selectedCards
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

  setPlayers(players: PlayersType[]): void {
    this.players = players
  }

  setBoardCards(boardCards: BoardCardType[]): void {
    this.boardCards = boardCards
  }
}

export default GameTableStore
export const gameTableStore = new GameTableStore()
