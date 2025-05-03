import { observer } from 'mobx-react-lite'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { Game, God, Lobby, Room, Stub, Table, Council, Verdict } from 'routes'
import { ConnectionStatus, StyledApp } from './App.styles'
import { useApp } from './useApp'
import { Icon } from 'components'

//TODO: Fix admin
//TODO: Error page and loading
//TODO: typography?
//TODO: Timer for vote
//TODO: Settings for timer, roles ect.

export const App: React.ComponentType = observer(() => {
  const { readyState, iconMapping } = useApp()

  const iconName = iconMapping[readyState]

  return (
    <StyledApp>
      <ConnectionStatus>
        <Icon iconName={iconName} size={25} />
      </ConnectionStatus>
      <Router>
        <Routes>
          <Route path='/' element={<Lobby />} />
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/room/:room_id' element={<Room />} />
          <Route path='/table/:room_id' element={<Table />} />
          <Route path='/game/:room_id' element={<Game />} />
          <Route path='/council/:room_id' element={<Council />} />
          <Route path='/verdict/:room_id' element={<Verdict />} />

          {/* God mode - todo delete */}
          <Route path='/god' element={<God />} />
          <Route path='/stub' element={<Stub />} />
        </Routes>
      </Router>
    </StyledApp>
  )
})
