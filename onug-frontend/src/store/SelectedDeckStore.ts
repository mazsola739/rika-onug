import { makeAutoObservable } from 'mobx'
import { CardType, ActionCardType } from 'types'
import { selectedDeckUtils } from 'utils'
import { deckStore } from 'store'
import { actionCards } from 'data'
import { roles } from 'constant'

const {
  containsById,
  selectCard,
  deselectCard,
  determineTotalPlayers,
  handleAlphaWolf,
  handleTemptress,
  prohibitDeselectingSupervillain,
  prohibitDeselectingWerewolf,
  isMirrorManOrCopycatSelected,
  hasSpecificRolesInDeck,
} = selectedDeckUtils

class SelectedDeckStore {
  selectedCards: CardType[] = []
  actionCards: ActionCardType[] = actionCards
  gamePlayDeck: ActionCardType[] = []
  MAX_ALLOWED_PLAYERS = 12

  constructor() {
    makeAutoObservable(this)
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
  }

  resetSelection(): void {
    this.selectedCards = []
    deckStore.resetDetailedCardInfo()
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
    const evils = ['vampire', 'alien', 'werewolf', 'supervillain']
    return hasSpecificRolesInDeck(this.gamePlayDeck, evils)
  }
}

export default SelectedDeckStore
export const selectedDeckStore = new SelectedDeckStore()
