import { observer } from 'mobx-react-lite'
import { Lobby, Room, GameTable, GamePlay, Voting, Settings } from 'routes'
import { roomStore } from 'store'
import { StyledApp } from './App.styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export const App = observer(() => {
  return (
    <StyledApp>
      <Router>
        <Routes>
          <Route path="/" element={<Lobby />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route
            path="/room/:room_id"
            element={<Room roomStore={roomStore} />}
          />
          <Route path="/gametable/:id" element={<GameTable />} />
          <Route path="/gameplay/:id" element={<GamePlay />} />
          <Route path="/voting/:id" element={<Voting />} />
          <Route path="/settings/:id" element={<Settings />} />
          {/* 404 Not Found Route    */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </StyledApp>
  )
})
