import { observer } from 'mobx-react-lite'
import { Lobby, Room, GameTable, GamePlay, GameVote, God, Stub } from 'routes'
import { wsStore } from 'store'
import { ConnectionStatus, StyledApp } from './App.styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useEffect, useState } from 'react'
import { NEWBIE, RELOAD, WS_HOST } from 'constant'
import { Icon } from 'components'
import { IconType } from 'components/Icon/Icon.types'

export const App: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(false)
  const [socketUrl] = useState(WS_HOST)
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    socketUrl,
    {
      onOpen: () => setFirstTime(true),
      shouldReconnect: () => true,
    }
  )

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      const token = sessionStorage.getItem('token')
      sendJsonMessage?.({ type: NEWBIE, token })
      sendJsonMessage?.({ type: RELOAD, token })
      wsStore.setSendJsonMessage(sendJsonMessage)
    }
    if (lastJsonMessage) {
      wsStore.setLastJsonMessage(lastJsonMessage)
    }

    if (lastJsonMessage?.type === NEWBIE && lastJsonMessage?.update) {
      sessionStorage.setItem('token', lastJsonMessage.token)
    }
  }, [wsStore, sendJsonMessage, lastJsonMessage, firstTime])

  const iconMapping: { [key: string]: IconType } = {
    [ReadyState.CONNECTING]: 'connecting',
    [ReadyState.OPEN]: 'open',
    [ReadyState.CLOSING]: 'closing',
    [ReadyState.CLOSED]: 'closed',
    [ReadyState.UNINSTANTIATED]: 'uninstantiated',
  }

  const iconName: IconType = iconMapping[readyState]

  return (
    <StyledApp>
      <ConnectionStatus>
        <Icon iconName={iconName} size={25} />
      </ConnectionStatus>
      <Router>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/room/:room_id" element={<Room />} />
          <Route path="/gametable/:room_id" element={<GameTable />} />
          <Route path="/gameplay/:room_id" element={<GamePlay />} />
          <Route path="/gamevote/:room_id" element={<GameVote />} />
          <Route path="/god" element={<God />} />
          <Route path="/stub" element={<Stub />} />
          {/* 404 Not Found Route    */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </StyledApp>
  )
})
