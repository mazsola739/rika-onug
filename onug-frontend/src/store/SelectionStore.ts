import { makeAutoObservable } from 'mobx'
import { gamePropStore } from 'store'

class SelectionStore {
  selectedCards: string[] = []
  selectedMarks: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  toggleCardSelection(position: string) {
    const isPlayerCard = position.startsWith('player_')
    const isCenterCard = position.startsWith('center_')
    const isSelected = this.selectedCards.includes(position)

    const playerCardsCount = this.selectedCards.filter(card => card.startsWith('player_')).length
    const centerCardsCount = this.selectedCards.filter(card => card.startsWith('center_')).length

    const { player: playerCardLimit, center: centerCardLimit } = gamePropStore.selectable_card_limit

    if (isSelected) {
      this.selectedCards = this.selectedCards.filter(card => card !== position)
    } else if (
      (isPlayerCard && playerCardsCount < playerCardLimit) ||
      (isCenterCard && centerCardsCount < centerCardLimit)
    ) {
      this.selectedCards = [...this.selectedCards, position]
    }
  }

  toggleMarkSelection(position: string) {
    const isSelected = this.selectedMarks.includes(position)
    const { mark: markLimit } = gamePropStore.selectable_mark_limit

    if (isSelected) {
      this.selectedMarks = this.selectedMarks.filter(mark => mark !== position)
    } else if (this.selectedMarks.length < markLimit) {
      this.selectedMarks = [...this.selectedMarks, position]
    }
  }

  resetSelection() {
    this.selectedCards = []
    this.selectedMarks = []
  }
}

export const selectionStore = new SelectionStore()
export default SelectionStore
