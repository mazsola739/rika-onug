import { GamePlay, Home, Room } from 'routes'
import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledApp } from './App.styles'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export const App = observer(() => {
  return (
    <StyledApp>
      <Router>
        <Routes>
          <Route path="/" element={<Home deckStore={deckStore} />} />
          <Route path="/room" element={<Room />} />
          <Route path="/gameplay" element={<GamePlay />} />

          {/* 404 Not Found Route    */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </StyledApp>
  )
})
