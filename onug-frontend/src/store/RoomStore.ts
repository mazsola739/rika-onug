import { makeAutoObservable } from 'mobx'
import { CardType } from 'types'
import { supervillainIdsToCheck, wolfIdsToCheck } from 'constant'
import { selectedDeckStore } from 'store'

export class RoomStore {
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
    let cards = [...this.selectedCards] // Copy to avoid mutations

    let chosenWolf: CardType
    if (this.hasAlphaWolf) {
      const availableWolves = cards.filter((card) =>
        wolfIdsToCheck.includes(card.id)
      )
      chosenWolf =
        availableWolves[Math.floor(Math.random() * availableWolves.length)]
      cards = cards.filter((card) => card !== chosenWolf)
    }

    let chosenSuperVillain: CardType
    if (this.hasTemptress) {
      const availableSuperVillains = cards.filter((card) =>
        supervillainIdsToCheck.includes(card.id)
      )
      chosenSuperVillain =
        availableSuperVillains[
          Math.floor(Math.random() * availableSuperVillains.length)
        ]
      cards = cards.filter((card) => card !== chosenSuperVillain)
    }

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
