import { makeObservable, observable, action } from 'mobx'
import { doppelgangerStore, oracleStore, roleStore } from './roleStores'
import { WsJsonMessage } from 'types'
import * as constants from '../constant'

class InteractionStore {
  lastJsonMessage: WsJsonMessage = {}
  hasMessageBox = false
  selectedPlayerCards: string[] = []
  selectedCenterCards: string[] = []
  selectedCards: string[] = []
  selectablePlayerCardLimit = 0
  selectableCenterCardLimit = 0
  message: string[] = []
  messageIcon = ''

  constructor() {
    makeObservable(this, {
      lastJsonMessage: observable,
      hasMessageBox: observable,
      selectedCenterCards: observable,
      selectedPlayerCards: observable,
      selectedCards: observable,
      selectablePlayerCardLimit: observable,
      selectableCenterCardLimit: observable,

      resetInteraction: action,
      toggleMessageBoxStatus: action,
      setSelectedCenterCards: action,
      setSelectedPlayerCards: action,
      setSelectedCards: action,
      setLastJsonMessage: action,
      setInteraction: action,
    })
  }

  resetInteraction(): void {
    this.selectedCenterCards = []
    this.selectedPlayerCards = []
    this.selectedCards = []
    this.toggleMessageBoxStatus(false)
    this.selectablePlayerCardLimit = 0
    this.selectableCenterCardLimit = 0
  }

  toggleMessageBoxStatus(boolean: boolean): void {
    this.hasMessageBox = boolean
  }

  setSelectedCenterCards(positions: string[]): void {
    this.selectedCenterCards = positions
  }

  setSelectedPlayerCards(positions: string[]): void {
    this.selectedPlayerCards = positions
  }

  setSelectedCards(positions: string[]): void {
    this.selectedCards = positions
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessage): void {
    this.lastJsonMessage = lastJsonMessage
  }

  setMessage(message: string[]): void {
    this.messageIcon = message[0]
    this.message = message.slice(1)
  }

  getMessage(): string | undefined {
    if (!this.message || this.message.length === 0) {
      return ''
    }

    const message = this.message
      .map((constantName) => constants[constantName as keyof typeof constants])
      .filter((constantValue) => constantValue !== undefined)
      .join(' ')

    return message || ''
  }

  setInteraction(title: string): void {
    switch (title) {
      case 'DOPPELGÄNGER_INSTANT_ACTION':
        doppelgangerStore.instantNightAction(this.lastJsonMessage)
        break
      case 'ORACLE_QUESTION':
        oracleStore.openYourEyes(this.lastJsonMessage)
        break
      case 'ORACLE_REACTION':
        oracleStore.openYourEyes(this.lastJsonMessage)
        break
      default:
        roleStore.openYourEyes(this.lastJsonMessage)
        break
    }
  }
}

export default InteractionStore
export const interactionStore = new InteractionStore()
