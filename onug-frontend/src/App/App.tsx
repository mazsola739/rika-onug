import { observer } from 'mobx-react-lite'
import { Lobby, Room, GameTable, GamePlay, Voting, God } from 'routes'
import { wsStore } from 'store'
import { StyledApp } from './App.styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useEffect, useState } from 'react'
import { NEWBIE } from 'constant'

export const App: React.FC = observer(() => {
  // firstTime initialized with false, since it will be really initialized with the onOpen ws event to true, to
  // avoid double NEWBIE call
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
    if (firstTime) {
      setFirstTime(false)
      const token = sessionStorage.getItem('token')
      sendJsonMessage?.({ type: NEWBIE, token })
      wsStore.setSendJsonMessage(sendJsonMessage)
    }
    if (lastJsonMessage) {
      wsStore.setLastJsonMessage(lastJsonMessage)
    }

    if (lastJsonMessage?.type === NEWBIE) {
      sessionStorage.setItem('token', lastJsonMessage.token)
    }
  }, [wsStore, sendJsonMessage, lastJsonMessage, firstTime])

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState]

  return (
    <StyledApp>
      <span>The WebSocket is currently {connectionStatus}</span>
      <Router>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/room/:room_id" element={<Room />} />
          <Route path="/gametable/:room_id" element={<GameTable />} />
          <Route path="/gameplay/:room_id" element={<GamePlay />} />
          <Route path="/voting/:room_id" element={<Voting />} />
          <Route path="/god" element={<God />} />
          {/* 404 Not Found Route    */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </StyledApp>
  )
})
