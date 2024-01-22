import { wsStore } from 'store'

export const useWebSocket = () => {
  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  return { sendJsonMessage, lastJsonMessage }
}
