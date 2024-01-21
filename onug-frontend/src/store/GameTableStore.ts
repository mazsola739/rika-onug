import { makeAutoObservable } from 'mobx'
import { CardType, CenterCardType, PlayersType } from 'types'
import { selectedDeckStore } from 'store'
import { hasMarkIds, supervillainIdsToCheck, wolfIdsToCheck } from 'constant'
import { utils, gameTableStoreUtils } from 'utils'

const { checkCardPresence, filterCardsByIds } = gameTableStoreUtils
const { areAnyCardSelectedById, getRandomItemFromArray, shuffleCardsArray } =
  utils

export class GameTableStore {
  centerCards: CenterCardType
  players: PlayersType[]

  constructor() {
    makeAutoObservable(this)

    this.setPlayers = this.setPlayers.bind(this)
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

  distributeCards(): {
    centerCards: CardType[]
    playerCards: CardType[]
    chosenWolf?: CardType
    chosenSuperVillain?: CardType
  } {
    let cards = [...this.selectedCards]

    const chosenWolf = this.hasAlphaWolf
      ? getRandomItemFromArray(filterCardsByIds(cards, wolfIdsToCheck))
      : undefined

    const chosenSupervillain = this.hasTemptress
      ? getRandomItemFromArray(filterCardsByIds(cards, supervillainIdsToCheck))
      : undefined

    if (chosenWolf) cards = cards.filter((card) => card !== chosenWolf)
    if (chosenSupervillain)
      cards = cards.filter((card) => card !== chosenSupervillain)

    const shuffledCards = shuffleCardsArray(cards)

    const centerCards = shuffledCards.slice(0, 3)
    const playerCards = shuffledCards.slice(3)

    return {
      centerCards,
      playerCards,
      chosenWolf,
      chosenSuperVillain: chosenSupervillain,
    }
  }
}

export default GameTableStore
export const gameTableStore = new GameTableStore()
