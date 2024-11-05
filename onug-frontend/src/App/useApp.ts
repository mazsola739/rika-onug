import { NEWBIE, RELOAD, WS_HOST } from 'constant'
import { useEffect, useState } from 'react'
import useWebSocket from 'react-use-websocket'
import { wsStore } from 'store'

interface WebSocketMessage {
  type: string
  token?: string
  update?: boolean
}

export const useApp = () => {
  const [firstTime, setFirstTime] = useState(false)
  const socketUrl = WS_HOST
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket<WebSocketMessage>(socketUrl, {
    onOpen: () => setFirstTime(true),
    shouldReconnect: () => true,
  })

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
      const token = sessionStorage.getItem('token')
      sendJsonMessage({ type: NEWBIE, token })
      sendJsonMessage({ type: RELOAD, token })
      wsStore.setSendJsonMessage(sendJsonMessage)
    }

    if (lastJsonMessage) {
      wsStore.setLastJsonMessage(lastJsonMessage)
    }

    if (lastJsonMessage?.type === NEWBIE && lastJsonMessage?.update) {
      sessionStorage.setItem('token', lastJsonMessage.token!)
    }
  }, [sendJsonMessage, lastJsonMessage, firstTime])

  return { readyState, sendJsonMessage }
}
