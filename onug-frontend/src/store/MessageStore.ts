import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'
import { script } from 'data'
import { makeAutoObservable } from 'mobx'
import { gamePropStore, riseAndRestStore, selectionStore } from 'store'
import { MessagesType, NarrationType } from 'types'
import { formatPositionSimply } from 'utils'

type RoleKeys = 'werewolves' | 'dreamwolf' | 'masons'

class MessageStore {
  narration: string
  privateMessage: string

  constructor() {
    makeAutoObservable(this)
    this.narration = ''
    this.privateMessage = ''
  }

  setNarration(narration_keys: NarrationType[]): void {
    const narration = narration_keys.map(key => narration_text[key]).join(' ')
    this.narration = narration
  }

  setPrivateMessage(message_keys: MessagesType[]): void {
    const message = message_keys.map(key => messages_text[key]).join(' ')
    this.privateMessage = message
  }

  get playerCardLimit() {
    return gamePropStore.selectable_card_limit.player
  }
  get centerCardLimit() {
    return gamePropStore.selectable_card_limit.center
  }
  get isCardSelection() {
    return gamePropStore.selectable_cards.length > 0
  }
  get isSelectableCards() {
    return this.allSelectableCards.length > 0
  }

  get isIdentification() {
    const title = gamePropStore.title
    return title === 'MINION' || title === 'WEREWOLF' || title === 'MASONS'
  }

  get disabled() {
    const { selectedCards } = selectionStore
    const selectedPlayerCards = selectedCards.filter(card => card.includes('player_')).length
    const selectedCenterCards = selectedCards.filter(card => card.includes('center_')).length

    const playerCardLimit = this.playerCardLimit
    const centerCardLimit = this.centerCardLimit

    if (selectedPlayerCards > 0 && selectedCenterCards > 0) return false

    if (selectedPlayerCards > 0 && selectedPlayerCards === playerCardLimit) return false

    if (selectedCenterCards > 0 && selectedCenterCards === centerCardLimit) return false
  
    return true
  }

  get narrationImage(): string {
    const scene = script.find(scene => scene.scene_title === gamePropStore.title)
    return scene ? scene.scene_img : ''
  }

  get allSelectableCards(): Record<string, string>[] {
    const selectablePlayerCards = riseAndRestStore.tablePlayerCards.filter(card => card.selectable_card)
    const selectableCenterCards = riseAndRestStore.tableCenterCards.filter(card => card.selectable_card)

    return [...selectablePlayerCards, ...selectableCenterCards].map(card => ({
      position: card.position,
      name: formatPositionSimply(card.position)
    }))
  }

  get allSelectedCards(): Record<string, string>[] {
    return selectionStore.selectedCards.map(position => ({
      position,
      name: formatPositionSimply(position)
    }))
  }

  getRoles(): RoleKeys[] {
    const title = gamePropStore.title

    switch (title) {
      case 'MINION':
        return ['werewolves']
      case 'WEREWOLF':
        return ['werewolves', 'dreamwolf']
      case 'MASONS':
        return ['masons']
      default:
        return []
    }
  }

  get identifiedCards() {
    const roleKeys = this.getRoles()

    if (roleKeys.length > 0) {
      const identifiedCards = roleKeys.flatMap((roleKey: RoleKeys) => {
        const cards = gamePropStore[roleKey] as string[]

        return cards.map((card: string) => ({
          position: card,
          name: formatPositionSimply(card)
        }))
      })

      return {
        roles: roleKeys,
        cards: identifiedCards
      }
    }
    return {}
  }
}

export default MessageStore
export const messageStore = new MessageStore()
