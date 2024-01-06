import { makeAutoObservable } from 'mobx'
import { CardType, ActionCardType, MarkType } from 'types'
import { actionStoreUtils, selectedDeckUtils } from 'utils'
import { action_marks, action_cards } from 'data'
import { alienIds, assassinIds, evils, roles, vampireIds } from 'constant'
import { roomStore } from 'store'
import { deckStore } from './DeckStore'

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
  actionCards: ActionCardType[] = action_cards
  gamePlayDeck: ActionCardType[] = []
  MAX_ALLOWED_PLAYERS = 12
  selectedMarks: MarkType[] = action_marks
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

  isSelected(cardId: number): boolean {
    return this.selectedCardIds.includes(cardId)
  }

  toggleCardSelectionStatus(cardId: number): void {
    const index = this.selectedCardIds.indexOf(cardId)
    if (index > -1) {
      this.selectedCardIds.splice(index, 1)
    } else {
      this.selectedCardIds.push(cardId)
    }
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

    roomStore.resetDetailedCardInfo()
    this.updateMarksInDeckStatus()
  }

  resetSelection(): void {
    this.selectedCards = []
    roomStore.resetDetailedCardInfo()
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

  revertCardUpdateOnFrontEnd(cardId: number): void {
    if (this.isSelected(cardId))
      this.handleDeselectCard(getCardById(this.deck, cardId))
    else this.handleSelectCard(getCardById(this.deck, cardId))
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
          mark.is_in_deck = areAnyCardsSelectedById(
            this.selectedCards,
            vampireIds
          )
          break
        case 'mark_of_fear':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 39)
          break
        case 'mark_of_the_bat':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 38)
          break
        case 'mark_of_disease':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 32)
          break
        case 'mark_of_love':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 31)
          break
        case 'mark_of_traitor':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 34)
          break
        case 'mark_of_clarity':
          mark.is_in_deck = isCardSelectedById(this.selectedCards, 37)
          break
        case 'mark_of_assassin':
          mark.is_in_deck = areAnyCardsSelectedById(
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

  async sendCardSelectionToBackend(cardId: number, roomId: string) {
    const cardStatus = this.isSelected(cardId) ? 'CARD_SELECT' : 'CARD_DESELECT'

    const requestBody = {
      route: 'update-select',
      room_id: roomId,
      update: {
        action: cardStatus,
        card_id: cardId,
      },
    }

    try {
      const response = await fetch('http://localhost:7654/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      const data = await response.json()
      if (data.success) {
        console.log('Successfully updated in backend:', data.message)
      } else {
        console.error(
          "Couldn't update gamestate on backend with the [de]selected card"
        )
        this.revertCardUpdateOnFrontEnd(cardId)
      }
    } catch (error) {
      console.error('Error sending card selection to backend:', error)
      this.revertCardUpdateOnFrontEnd(cardId)
    }
  }
}

export default SelectedDeckStore
export const selectedDeckStore = new SelectedDeckStore()
