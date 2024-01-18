import { makeAutoObservable } from 'mobx'
import { SendJsonMessageType, WsJsonMessage } from 'types'

class WsStore {
  sendJsonMessage: SendJsonMessageType<unknown> | null = null
  lastJsonMessage: WsJsonMessage = {}
  wsCommunicationsBridge = {
    sendJsonMessage: this.sendJsonMessage,
    lastJsonMessage: this.lastJsonMessage,
  }

  constructor() {
    makeAutoObservable(this)
  }

  setSendJsonMessage<T>(
    sendJsonMessage: (jsonMessage: T, keep?: boolean) => void
  ): void {
    this.sendJsonMessage = sendJsonMessage
  }

  getSendJsonMessage<T>(): (jsonMessage: T, keep?: boolean) => void {
    return this.sendJsonMessage as (jsonMessage: T, keep?: boolean) => void
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessage) {
    this.lastJsonMessage = lastJsonMessage
  }

  getLastJsonMessage(): WsJsonMessage {
    return this.lastJsonMessage
  }

  getWsCommunicationsBridge() {
    return this.wsCommunicationsBridge
  }
}

export default WsStore
export const wsStore = new WsStore()
