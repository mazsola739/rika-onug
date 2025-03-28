import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'
import { script } from 'data'
import { makeAutoObservable } from 'mobx'
import { propStore, riseAndRestStore, selectionStore } from 'store'
import { MessagesType, NarrationType, RoleKeys } from 'types'
import { formatPositionSimply } from 'utils'

class MessageStore {
  narration: string = ''
  privateMessage: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setNarration(narration_keys: NarrationType[]): void {
    const narration = narration_keys.map(key => narration_text[key]).join(' ')
    this.narration = narration
  }

  setPrivateMessage(message_keys: MessagesType[]): void {
    const message = message_keys.map(key => messages_text[key]).join(' ')
    this.privateMessage = message
  }

  deleteMessage(): void {
    this.narration = ''
    this.privateMessage = ''
  }

  get narrationImage(): string {
    const scene = script.find(scene => scene.scene_title === propStore.title)
    return scene ? scene.scene_img : ''
  }

  get disabledCards() {
    const selectedPlayerCards = selectionStore.selectedCards.filter(card => card.includes('player_')).length
    const selectedCenterCards = selectionStore.selectedCards.filter(card => card.includes('center_')).length

    const playerCardLimit = this.playerCardLimit
    const centerCardLimit = this.centerCardLimit

    if (selectedPlayerCards > 0 && selectedCenterCards > 0) return false

    if (selectedPlayerCards > 0 && selectedPlayerCards === playerCardLimit) return false

    if (selectedCenterCards > 0 && selectedCenterCards === centerCardLimit) return false

    return true
  }

  get disabledMarks() {
    const { selectedMarks } = selectionStore

    const markLimit = this.markLimit

    if (selectedMarks.length > 0 && selectedMarks.length === markLimit) return false

    return true
  }

  get playerCardLimit() {
    return propStore.selectable_card_limit.player
  }
  get centerCardLimit() {
    return propStore.selectable_card_limit.center
  }
  get markLimit() {
    return propStore.selectable_mark_limit.mark
  }

  get isCardSelection() {
    return propStore.selectable_cards.length > 0
  }
  get isAnswerOptions() {
    return propStore.answer_options.length > 0
  }

  get isSelectableCards() {
    return this.allSelectableCards.length > 0
  }
  get isSelectableMarks() {
    return this.allSelectableMarks.length > 0
  }

  get isVoteResult() {
    return propStore.vampireVotes || propStore.alienVotes //|| propStore.emapthVote || propStore.doppelgangerempathVote
  }
  get isPlayerIdentification() {
    const title = propStore.title
    return ['MINION', 'WEREWOLVES', 'MASONS', 'VAMPIRES', 'ALIENS', 'GROOB_ZERB', 'BLOB'].includes(title)
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

  get allSelectableMarks(): Record<string, string>[] {
    const selectableMarks = riseAndRestStore.tablePlayerCards.filter(card => card.selectable_mark)

    return [...selectableMarks].map(card => ({
      position: card.position,
      name: formatPositionSimply(card.position)
    }))
  }
  get allSelectedMarks(): Record<string, string>[] {
    return selectionStore.selectedMarks.map(position => ({
      position,
      name: formatPositionSimply(position)
    }))
  }

  getRoles(): RoleKeys[] {
    const title = propStore.title

    switch (title) {
      case 'MINION':
        return ['werewolves']
      case 'WEREWOLVES':
        return ['werewolves', 'dreamwolf']
      case 'MASONS':
        return ['masons']
      case 'ALIENS':
        return ['aliens', 'cow']
      case 'GROOB_ZERB':
        return ['groobzerb']
      case 'VAMPIRES':
        return ['vampires']
      case 'BLOB':
        return ['part_of_blob']
      default:
        return []
    }
  }

  get identifiedPlayers() {
    const roleKeys = this.getRoles()

    if (roleKeys.length > 0) {
      const identifiedPlayers = roleKeys.flatMap((roleKey: RoleKeys) => {
        const players = propStore[roleKey] as string[]

        return players.map((player: string) => ({
          position: player.replace(/player_/g, ''),
          name: roleKey.replace(/part_of_/g, '').replace(/\b\w/g, char => char.toUpperCase())
        }))
      })

      return {
        roles: roleKeys.map(roleKey => roleKey.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())),
        players: identifiedPlayers
      }
    }
    return {}
  }
}

export default MessageStore
export const messageStore = new MessageStore()
