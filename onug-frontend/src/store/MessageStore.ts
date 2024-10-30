import * as messages_text from 'constant/messages'
import * as narration_text from 'constant/narrations'
import { makeAutoObservable } from 'mobx'
import { MessagesType, NarrationType } from 'types'

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
}

export default MessageStore
export const messageStore = new MessageStore()
