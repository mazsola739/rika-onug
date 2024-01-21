import { observer } from 'mobx-react-lite'
import { Lobby, Room, GameTable, GamePlay, Voting, God } from 'routes'
import { wsStore } from 'store'
import { ConnectionStatusIcon, StyledApp } from './App.styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useEffect, useMemo, useState } from 'react'
import { NEWBIE, RELOAD } from 'constant'

export const App: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(false)
  const [socketUrl] = useState('ws://localhost:7655/')
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

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'connecting',
    [ReadyState.OPEN]: 'open',
    [ReadyState.CLOSING]: 'closing',
    [ReadyState.CLOSED]: 'closed',
    [ReadyState.UNINSTANTIATED]: 'uninstantiated',
  }[readyState]

  const imageSrc = useMemo(
    () => `/assets/icons/${connectionStatus}.svg`,
    [connectionStatus]
  )

  return (
    <StyledApp>
      <ConnectionStatusIcon src={imageSrc} alt={connectionStatus} />
      <Router>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/room/:room_id" element={<Room />} />
          <Route path="/gametable/:room_id" element={<GameTable />} />
          <Route path="/gameplay/:room_id" element={<GamePlay />} />
          <Route path="/voting" element={<Voting />} />
          <Route path="/god" element={<God />} />
          {/* 404 Not Found Route    */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </StyledApp>
  )
})
