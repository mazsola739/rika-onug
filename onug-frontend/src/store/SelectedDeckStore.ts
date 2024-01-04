import { makeAutoObservable } from 'mobx'
import { CardType, ActionCardType, MarkType } from 'types'
import { actionStoreUtils, selectedDeckUtils } from 'utils'
import { deckStore } from 'store'
import { actionMarks, actioncards } from 'data'
import { alienIds, assassinIds, evils, roles, vampireIds } from 'constant'

const {
  containsById,
  deselectCard,
  determineTotalPlayers,
  handleAlphaWolf,
  handleTemptress,
  hasSpecificRolesInDeck,
  isMirrorManOrCopycatSelected,
  prohibitDeselectingSupervillain,
  prohibitDeselectingWerewolf,
  selectCard,
  getCardById,
} = selectedDeckUtils
const { areAnyCardsSelectedById, isCardSelectedById } = actionStoreUtils

class SelectedDeckStore {
  selectedCards: CardType[] = []
  actionCards: ActionCardType[] = actioncards
  gamePlayDeck: ActionCardType[] = []
  MAX_ALLOWED_PLAYERS = 12
  selectedMarks: MarkType[] = actionMarks
  selectedCardIds: number[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get deck(): CardType[] {
    return deckStore.deck
  }

  get totalCharacters(): number {
    return this.selectedCards.length
  }

  get totalPlayers(): number {
    return determineTotalPlayers(this.totalCharacters, this.selectedCards)
  }

  toggleCardSelection(card: CardType): void {
    const isSpecialCard =
      card.display_name === roles.role_mirrorman ||
      card.display_name === roles.role_copycat

    if (isSpecialCard && this.isMirrorManOrCopycatSelected()) {
      const existingSpecialCard = this.selectedCards.find(
        (card) =>
          card.display_name === roles.role_mirrorman ||
          card.display_name === roles.role_copycat
      )
      existingSpecialCard && this.handleDeselectCard(existingSpecialCard)
    } else if (containsById(this.selectedCards, card.id)) {
      this.handleDeselectCard(card)
    } else if (this.totalPlayers < this.MAX_ALLOWED_PLAYERS) {
      this.handleSelectCard(card)
    }

    deckStore.resetDetailedCardInfo()
    this.updateMarksInDeckStatus()
  }

  resetSelection(): void {
    this.selectedCards = []
    deckStore.resetDetailedCardInfo()
    this.updateMarksInDeckStatus()
  }

  updatePlayDeckWithSelectedCards(selectedCards: CardType[]): void {
    const selectedCardIds = selectedCards.map((card) => card.id)

    const selectedActionCards = this.actionCards.filter((actionCard) =>
      selectedCardIds.includes(actionCard.id)
    )

    const uniqueCardIds = new Set([
      ...selectedCardIds,
      ...selectedActionCards.map((card) => card.id),
    ])

    const uniqueCards = Array.from(uniqueCardIds)
      .map((id) => this.actionCards.find((actionCard) => actionCard.id === id))
      .filter(Boolean) as ActionCardType[]

    this.gamePlayDeck = uniqueCards
  }

  isMirrorManOrCopycatSelected(): boolean {
    return isMirrorManOrCopycatSelected(this.selectedCards)
  }

  handleSelectCard(card: CardType): void {
    selectCard(this.selectedCards, card)
    this.addCardToPlayDeck(card)

    if (card.display_name === roles.role_alphawolf) {
      handleAlphaWolf(this.selectedCards)
    }
    if (card.display_name === roles.role_temptress) {
      handleTemptress(this.selectedCards)
    }
  }

  handleDeselectCard(card: CardType): void {
    if (prohibitDeselectingWerewolf(this.selectedCards, card)) {
      handleAlphaWolf(this.selectedCards)
    } else if (prohibitDeselectingSupervillain(this.selectedCards, card)) {
      handleTemptress(this.selectedCards)
    } else {
      deselectCard(this.selectedCards, card)
      this.removeCardFromPlayDeck(card)
    }
  }

  updateSelectedCards(cardIds: number[]): void {
    this.selectedCards = []
    cardIds.forEach((cardId) => {
      this.handleSelectCard(getCardById(this.deck, cardId))
    })
  }

  addCardToPlayDeck(card: CardType): void {
    if (!this.gamePlayDeck.some((playCard) => playCard.id === card.id)) {
      this.gamePlayDeck.push(card)
    }
  }

  removeCardFromPlayDeck(card: CardType): void {
    this.gamePlayDeck = this.gamePlayDeck.filter(
      (playCard) => playCard.id !== card.id
    )
  }

  hasDusk(): boolean {
    return this.gamePlayDeck.some((card) => card.wake_up_time === 'dusk')
  }

  isEpicBattle(): boolean {
    return hasSpecificRolesInDeck(this.gamePlayDeck, evils)
  }

  shouldStartRipple(): boolean {
    return this.selectedCards.some((card) => alienIds.includes(card.id))
  }

  updateMarksInDeckStatus(): void {
    this.selectedMarks.forEach((mark) => {
      switch (mark.token_name) {
        case 'mark_of_vampire':
          mark.isInDeck = areAnyCardsSelectedById(
            this.selectedCards,
            vampireIds
          )
          break
        case 'mark_of_fear':
          mark.isInDeck = isCardSelectedById(this.selectedCards, 39)
          break
        case 'mark_of_the_bat':
          mark.isInDeck = isCardSelectedById(this.selectedCards, 38)
          break
        case 'mark_of_disease':
          mark.isInDeck = isCardSelectedById(this.selectedCards, 32)
          break
        case 'mark_of_love':
          mark.isInDeck = isCardSelectedById(this.selectedCards, 31)
          break
        case 'mark_of_traitor':
          mark.isInDeck = isCardSelectedById(this.selectedCards, 34)
          break
        case 'mark_of_clarity':
          mark.isInDeck = isCardSelectedById(this.selectedCards, 37)
          break
        case 'mark_of_assassin':
          mark.isInDeck = areAnyCardsSelectedById(
            this.selectedCards,
            assassinIds
          )
          break
        default:
          break
      }
    })
  }

  addCardIdsToArray(): number[] {
    return this.selectedCards.map((card) => this.selectedCardIds.push(card.id))
  }
}

export default SelectedDeckStore
export const selectedDeckStore = new SelectedDeckStore()
