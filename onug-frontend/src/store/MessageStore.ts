import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'
import { script } from 'data'
import { makeAutoObservable } from 'mobx'
import { gamePropStore, riseAndRestStore, selectionStore } from 'store'
import { MessagesType, NarrationType } from 'types'
import { formatPosition, formatPositionSimply } from 'utils'

class MessageStore {
  narration: string
  privateMessage: string

  constructor() {
    makeAutoObservable(this)
  }

  setNarration(narration_keys: NarrationType[]): void {
    const narration = narration_keys.map((key) => narration_text[key]).join(' ')
    this.narration = narration
  }

  setPrivateMessage(message_keys: MessagesType[]): void {
    const message = message_keys.map((key) => messages_text[key]).join(' ')
    this.privateMessage = message
  }

  get playerCardLimit() { return gamePropStore.selectable_card_limit.player }
  get centerCardLimit() { return gamePropStore.selectable_card_limit.center }
  get isCardSelection() { return gamePropStore.selectable_cards.length > 0 }
  get isSelectableCards() { return this.allSelectableCards.length > 0 }

  get isIdentification () {
    return gamePropStore.title === 'MINION'
  }

  get disabled() {
    const { selectedCards } = selectionStore;
    const selectedPlayerCards = selectedCards.filter(card => card.includes('player_')).length
    const selectedCenterCards = selectedCards.filter(card => card.includes('center_')).length
  
    const playerCardLimit = this.playerCardLimit
    const centerCardLimit = this.centerCardLimit
  
    const isSelectingPlayerCards = this.isCardSelection
    const isSelectingCenterCards = !this.isCardSelection
  
    if (isSelectingPlayerCards) {
      return selectedPlayerCards < playerCardLimit
    }
  
    if (isSelectingCenterCards) {
      return selectedCenterCards < centerCardLimit
    }
  
    return true
  }
  

  get narrationImage(): string {
    const scene = script.find((scene) => scene.scene_title === gamePropStore.title)
    return scene ? scene.scene_img : ''
  }

  get allSelectableCards(): Record<string, string>[] {
    const selectablePlayerCards = riseAndRestStore.tablePlayerCards.filter((card) => card.selectable_card)
    const selectableCenterCards = riseAndRestStore.tableCenterCards.filter((card) => card.selectable_card)

    const collectedCards = [...selectablePlayerCards, ...selectableCenterCards].map((card) => ({
      position: card.position,
      name: formatPositionSimply(card.position),
    }))

    return collectedCards
  }
  
  get allSelectedCards(): Record<string, string>[] {
    const formattedSelectedCards = selectionStore.selectedCards.map((position) => ({
      position,
      name: formatPositionSimply(position),
    }))

    return formattedSelectedCards
  }
}

export default MessageStore
export const messageStore = new MessageStore()
