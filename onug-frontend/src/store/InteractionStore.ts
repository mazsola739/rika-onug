import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'
import { makeAutoObservable } from 'mobx'
import { InteractionType, MessagesType, NarrationType } from 'types'
import { playersStore } from './PlayersStore'

class InteractionStore {
  interaction: InteractionType
  narrationStr: string
  privateMessageStr: string

  constructor() {
    makeAutoObservable(this)
  }

  setInteraction(interaction: InteractionType): void {
    this.interaction = interaction
    if (interaction.private_message) {
      this.setPrivateMessage(interaction.private_message as MessagesType[])
    }
  }

  setNarration(narration_keys: NarrationType[]): void {
    this.narrationStr = narration_keys.map((key) => narration_text[key]).join(' ')
  }

  setPrivateMessage(message_keys: MessagesType[]): void {
    this.privateMessageStr = message_keys.map((key) => messages_text[key]).join(' ')
  }

  get narration(): string {
    return this.narrationStr
  }

  get privateMessage(): string {
    return this.privateMessageStr
  }

  get player(): { player_name: string; player_number: number } {
    return {
      player_name: playersStore.player?.player_name || '',
      player_number: playersStore.player?.player_number || 0
    }
  }

  closeYourEyes(): void {
    this.interaction = null
    this.narrationStr = ''
    this.privateMessageStr = ''
  }

}

export default InteractionStore
export const interactionStore = new InteractionStore()
