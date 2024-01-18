import { observer } from 'mobx-react-lite'
import { Lobby, Room, GameTable, GamePlay, Voting, Settings } from 'routes'
import { wsStore } from 'store'
import { StyledApp } from './App.styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { useEffect, useState } from 'react'
import { KEEP_ALIVE, NEWBIE } from 'constant'

export const App: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const pathname = window.location.pathname
  const { setRedirectPath } = wsStore
  const [socketUrl] = useState('ws://localhost:7655/')
  const { readyState, sendJsonMessage, lastJsonMessage } = useWebSocket(
    socketUrl,
    {
      onOpen: () => setFirstTime(true),
      shouldReconnect: () => true,
    }
  )

  useEffect(() => {
    const token = sessionStorage.getItem('token')

    if (firstTime && !['/', '/lobby'].includes(pathname)) {
      setRedirectPath('/lobby')
    } else if (
      sendJsonMessage &&
      firstTime &&
      ['/', '/lobby'].includes(pathname)
    ) {
      setFirstTime(false)
      sendJsonMessage({ type: NEWBIE, token })
      wsStore.setSendJsonMessage(sendJsonMessage)
    }
    if (lastJsonMessage) {
      wsStore.setLastJsonMessage(lastJsonMessage)
    }
    if (lastJsonMessage?.type !== KEEP_ALIVE) {
      if (lastJsonMessage?.type === NEWBIE) {
        sessionStorage.setItem('token', lastJsonMessage.token)
      }
    }
  }, [sendJsonMessage, wsStore, lastJsonMessage, firstTime, setRedirectPath])

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
          <Route path="/settings/:room_id" element={<Settings />} />
          {/* 404 Not Found Route    */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </StyledApp>
  )
})
