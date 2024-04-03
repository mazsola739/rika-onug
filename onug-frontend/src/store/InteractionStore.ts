import { makeObservable, observable, action, observe } from 'mobx'
import { WsJsonMessage } from 'types'
import { doppelgangerStore, roleStore } from './roleStores'
import * as constants from '../constant'

class InteractionStore {
  lastJsonMessage: WsJsonMessage = {}
  hasMessageBox = false
  selectedPlayerCards: string[] = []
  selectedCenterCards: string[] = []
  selectedCards: string[] = []
  selectedMarks: string[] = []
  selectablePlayerCardLimit = 0
  selectableCenterCardLimit = 0
  selectableMarkLimit = 0
  message: string[] = []
  messageIcon = ''
  votes: Record<string, number[]> = {}

  constructor() {
    makeObservable(this, {
      lastJsonMessage: observable,
      hasMessageBox: observable,
      selectedCenterCards: observable,
      selectedPlayerCards: observable,
      selectedCards: observable,
      selectedMarks: observable,
      selectablePlayerCardLimit: observable,
      selectableCenterCardLimit: observable,
      selectableMarkLimit: observable,
      votes: observable,

      resetInteraction: action,
      toggleMessageBoxStatus: action,
      setSelectedCenterCards: action,
      setSelectedPlayerCards: action,
      setSelectedCards: action,
      setSelectedMarks: action,
      setLastJsonMessage: action,
      setInteraction: action,
    })
  }

  resetInteraction(): void {
    this.selectedCenterCards = []
    this.selectedPlayerCards = []
    this.selectedCards = []
    this.selectedMarks = []
    this.toggleMessageBoxStatus(false)
    this.selectablePlayerCardLimit = 0
    this.selectableCenterCardLimit = 0
    this.selectableMarkLimit = 0
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

  setSelectedMarks(positions: string[]): void {
    this.selectedMarks = positions
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessage): void {
    this.lastJsonMessage = lastJsonMessage
  }

  setMessageIcon(icon: string): void {
    this.messageIcon = icon
  }

  setMessage(message: string[]): void {
    this.message = message
  }

  setVotes(votes: Record<string, number[]>): void {
    this.votes = votes
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
      default:
        roleStore.openYourEyes(this.lastJsonMessage)
        break
    }
  }
}

export default InteractionStore
export const interactionStore = new InteractionStore()
