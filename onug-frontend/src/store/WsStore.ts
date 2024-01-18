import { action, makeObservable, observable } from 'mobx'
import { SendJsonMessageType, WsJsonMessage } from 'types'

class WsStore {
  sendJsonMessage: SendJsonMessageType<unknown> | null = null
  lastJsonMessage: WsJsonMessage = {}

  constructor() {
    makeObservable(this, {
      sendJsonMessage: observable,
      lastJsonMessage: observable,
      setSendJsonMessage: action,
      setLastJsonMessage: action,
      getWsCommunicationsBridge: action,
    })
  }

  setSendJsonMessage<T>(sendJsonMessage: SendJsonMessageType<T>): void {
    this.sendJsonMessage = sendJsonMessage
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessage): void {
    this.lastJsonMessage = lastJsonMessage
  }

  getWsCommunicationsBridge() {
    return {
      get sendJsonMessage() {
        return wsStore.sendJsonMessage
      },
      get lastJsonMessage() {
        return wsStore.lastJsonMessage
      },
    }
  }
}

export default WsStore
export const wsStore = new WsStore()
