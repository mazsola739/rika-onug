import { makeAutoObservable } from 'mobx'
import { SendJsonMessageType, WsJsonMessageType } from 'types'
import { encodeJsonKeys, decodeJsonKeys } from 'utils'

class WsStore {
  sendJsonMessage: SendJsonMessageType<unknown> | null = null
  lastJsonMessage: WsJsonMessageType = {}

  constructor() {
    makeAutoObservable(this)
  }

  setSendJsonMessage(sendJsonMessage: SendJsonMessageType<unknown>): void {
    this.sendJsonMessage = (message: unknown) => {
      sendJsonMessage(encodeJsonKeys(message))
    }
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessageType): void {
    this.lastJsonMessage = decodeJsonKeys(lastJsonMessage)
  }

  getWsCommunicationsBridge() {
    return {
      sendJsonMessage: this.sendJsonMessage,
      lastJsonMessage: this.lastJsonMessage
    }
  }
}
export const wsStore = new WsStore()
