import { makeAutoObservable } from 'mobx'
import { CardType, PlayerType } from 'types'
import { selectedDeckStore } from 'store'
import { supervillainIdsToCheck, wolfIdsToCheck } from 'constant'
import { roomStoreUtils } from 'utils'

const { filterCardsByIds, getRandomItemFromArray } = roomStoreUtils

export class RoomStore {
  players: PlayerType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get selectedCards(): CardType[] {
    return selectedDeckStore.selectedCards
  }

  get hasAlphaWolf(): boolean {
    return this.selectedCards.some((card) => card.id === 17)
  }

  get hasTemptress(): boolean {
    return this.selectedCards.some((card) => card.id === 69)
  }

  shuffleCards(cards: CardType[]): CardType[] {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[cards[i], cards[j]] = [cards[j], cards[i]]
    }
    return cards
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

    const chosenSuperVillain = this.hasTemptress
      ? getRandomItemFromArray(filterCardsByIds(cards, supervillainIdsToCheck))
      : undefined

    if (chosenWolf) cards = cards.filter((card) => card !== chosenWolf)
    if (chosenSuperVillain)
      cards = cards.filter((card) => card !== chosenSuperVillain)

    const shuffledCards = this.shuffleCards(cards)

    const centerCards = shuffledCards.slice(0, 3)
    const playerCards = shuffledCards.slice(3)

    return {
      centerCards,
      playerCards,
      chosenWolf,
      chosenSuperVillain,
    }
  }
}

export default RoomStore
export const roomStore = new RoomStore()
