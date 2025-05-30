import { IconType } from 'components/Icon/Icon.types'
import { NEWBIE, RELOAD, WS_HOST } from 'constants'
import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { wsStore } from 'store'
import { encodeJsonKeys, decodeJsonKeys } from 'utils'

interface WebSocketMessage {
  type: string
  token?: string
  update?: boolean
}

export const useApp = () => {
  const token = sessionStorage.getItem('token')

  const [firstTime, setFirstTime] = useState(false)
  const socketUrl = WS_HOST
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocketMessage>(socketUrl, {
    onOpen: () => setFirstTime(true),
    shouldReconnect: () => true
  })

  const iconMapping: { [key: string]: IconType } = {
    [ReadyState.CONNECTING]: 'connecting',
    [ReadyState.OPEN]: 'open',
    [ReadyState.CLOSING]: 'closing',
    [ReadyState.CLOSED]: 'closed',
    [ReadyState.UNINSTANTIATED]: 'uninstantiated'
  }

  useEffect(() => {
    const handleRightClick = (event: MouseEvent) => {
      event.preventDefault()
    }

    document.addEventListener('contextmenu', handleRightClick)

    return () => {
      document.removeEventListener('contextmenu', handleRightClick)
    }
  }, [])

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage(encodeJsonKeys({ type: NEWBIE, token }))
      sendJsonMessage(encodeJsonKeys({ type: RELOAD, token }))
      wsStore.setSendJsonMessage(sendJsonMessage)
    }

    if (lastJsonMessage) {
      const decodedMessage = decodeJsonKeys(lastJsonMessage)
      wsStore.setLastJsonMessage(lastJsonMessage)
      if (decodedMessage?.type === NEWBIE && decodedMessage?.update) {
        sessionStorage.setItem('token', decodedMessage.token!)
      }
    }
  }, [sendJsonMessage, lastJsonMessage, firstTime])

  return { readyState, iconMapping, sendJsonMessage }
}
