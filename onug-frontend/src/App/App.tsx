import { IconType } from 'components/Icon/Icon.types'
import { observer } from 'mobx-react-lite'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ReadyState } from 'react-use-websocket'
import { Game, God, Lobby, Room, Stub, Table, Council, Verdict } from 'routes'
import { ConnectionStatus, StyledApp } from './App.styles'
import { useApp } from './useApp'
import { Icon } from 'components'

//TODO: Login page & fix admin
//TODO: Error page and loading
//TODO: Timer for vote
//TODO: Settings for timer, roles ect.

export const App: React.ComponentType = observer(() => {
  const { readyState } = useApp()

  const iconMapping: { [key: string]: IconType } = {
    [ReadyState.CONNECTING]: 'connecting',
    [ReadyState.OPEN]: 'open',
    [ReadyState.CLOSING]: 'closing',
    [ReadyState.CLOSED]: 'closed',
    [ReadyState.UNINSTANTIATED]: 'uninstantiated'
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
          <Route path="/table/:room_id" element={<Table />} />
          <Route path="/game/:room_id" element={<Game />} />
          <Route path="/council/:room_id" element={<Council />} />
          <Route path="/verdict/:room_id" element={<Verdict />} />

          {/* God mode */}
          <Route path="/god" element={<God />} />
          <Route path="/stub" element={<Stub />} />
        </Routes>
      </Router>
    </StyledApp>
  )
})
