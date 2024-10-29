import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'
import { makeAutoObservable } from 'mobx'
import { InteractionType, MessagesType, NarrationType } from 'types'
import { deckStore } from './DeckStore'
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

  closeYourEyes(): void {
    this.interaction = null
    this.narrationStr = ''
    this.privateMessageStr = ''

    deckStore.clearPlayerCard()
    deckStore.clearPlayerMark()

    const tablePlayer = playersStore.tablePlayer;
    if (tablePlayer) {
        tablePlayer.player_card_id = 0  
        tablePlayer.player_mark = ''
    }

    playersStore.initializeTablePlayers()
  }

}

export default InteractionStore
export const interactionStore = new InteractionStore()
