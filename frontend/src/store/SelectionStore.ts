import { makeAutoObservable } from 'mobx'
import { propStore } from 'store'

class SelectionStore {
  selectedCards: string[] = []
  selectedMarks: string[] = []
  selectedAnswer: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  toggleCardSelection(position: string) {
    const isPlayerCard = position.startsWith('player_')
    const isCenterCard = position.startsWith('center_')
    const isSelected = this.selectedCards.includes(position)

    const playerCardsCount = this.selectedCards.filter(card => card.startsWith('player_')).length
    const centerCardsCount = this.selectedCards.filter(card => card.startsWith('center_')).length

    const { player: playerCardLimit, center: centerCardLimit } = propStore.selectable_card_limit

    const selectedPlayerCards = playerCardsCount > 0
    const selectedCenterCards = centerCardsCount > 0

    if (!isSelected && ((isPlayerCard && selectedCenterCards) || (isCenterCard && selectedPlayerCards))) {
      return
    }

    if (isSelected) {
      this.selectedCards = this.selectedCards.filter(card => card !== position)
    } else {
      if ((isPlayerCard && playerCardsCount < playerCardLimit) || (isCenterCard && centerCardsCount < centerCardLimit)) {
        this.selectedCards = [...this.selectedCards, position]
      }
    }
  }

  toggleMarkSelection(position: string) {
    const isSelected = this.selectedMarks.includes(position)
    const { mark: markLimit } = propStore.selectable_mark_limit

    if (isSelected) {
      this.selectedMarks = this.selectedMarks.filter(mark => mark !== position)
    } else if (this.selectedMarks.length < markLimit) {
      this.selectedMarks = [...this.selectedMarks, position]
    }
  }

  toggleAnswerSelection(answer: string) {
    const isSelected = this.selectedAnswer === answer

    if (isSelected) {
      this.selectedAnswer = ''
    } else {
      this.selectedAnswer = answer
    }
  }
  resetSelection() {
    this.selectedCards = []
    this.selectedMarks = []
  }
}

export const selectionStore = new SelectionStore()
