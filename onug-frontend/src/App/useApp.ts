import { IconType } from 'components/Icon/Icon.types'
import { NEWBIE, RELOAD, WS_HOST } from 'constant'
import { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { wsStore } from 'store'
import { encodeJsonKeys, decodeJsonKeys } from 'utils'

//TODO type move from here

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

  const wrappedSendJsonMessage = (message: WebSocketMessage) => {
    const encodedMessage = encodeJsonKeys(message)
    console.log(message)
    console.log(encodedMessage)
    sendJsonMessage(encodedMessage)
  }

  const decodedLastJsonMessage = lastJsonMessage ? decodeJsonKeys(lastJsonMessage) : null

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
    if (wrappedSendJsonMessage && firstTime) {
      setFirstTime(false)
      wrappedSendJsonMessage({ type: NEWBIE, token })
      wrappedSendJsonMessage({ type: RELOAD, token })
      wsStore.setSendJsonMessage(wrappedSendJsonMessage)
    }

    if (decodedLastJsonMessage) {
      wsStore.setLastJsonMessage(decodedLastJsonMessage)
    }

    if (decodedLastJsonMessage?.type === NEWBIE && decodedLastJsonMessage?.update) {
      sessionStorage.setItem('token', decodedLastJsonMessage.token!)
      //TODO save name
    }
  }, [wrappedSendJsonMessage, decodedLastJsonMessage, firstTime])

  return { readyState, iconMapping, sendJsonMessage: wrappedSendJsonMessage }
}
