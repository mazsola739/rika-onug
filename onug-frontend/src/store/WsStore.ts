import { makeAutoObservable } from 'mobx'
import { SendJsonMessageType, WsJsonMessage } from 'types'

class WsStore {
  sendJsonMessage: SendJsonMessageType<unknown> | null = null
  lastJsonMessage: WsJsonMessage = {}

  constructor() {
    makeAutoObservable(this)
  }

  setSendJsonMessage(sendJsonMessage: SendJsonMessageType<unknown>): void {
    this.sendJsonMessage = sendJsonMessage
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessage): void {
    this.lastJsonMessage = lastJsonMessage
  }

  getWsCommunicationsBridge() {
    return {
      sendJsonMessage: this.sendJsonMessage,
      lastJsonMessage: this.lastJsonMessage,
    }
  }
}

export default WsStore
export const wsStore = new WsStore()
