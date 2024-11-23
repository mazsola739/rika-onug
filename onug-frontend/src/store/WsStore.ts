import { makeAutoObservable } from 'mobx'
import { SendJsonMessageType, WsJsonMessageType } from 'types'

class WsStore {
  sendJsonMessage: SendJsonMessageType<unknown> | null = null
  lastJsonMessage: WsJsonMessageType = {}

  constructor() {
    makeAutoObservable(this)
  }

  setSendJsonMessage(sendJsonMessage: SendJsonMessageType<unknown>): void {
    this.sendJsonMessage = sendJsonMessage
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessageType): void {
    this.lastJsonMessage = lastJsonMessage
  }

  getWsCommunicationsBridge() {
    return {
      sendJsonMessage: this.sendJsonMessage,
      lastJsonMessage: this.lastJsonMessage
    }
  }
}

export default WsStore
export const wsStore = new WsStore()
