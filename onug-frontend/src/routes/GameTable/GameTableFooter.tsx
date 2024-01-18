import { Footer, FooterButtons, Button } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { buttons } from 'constant'
import { gamePlayStore, selectedDeckStore } from 'store'
import { Messages } from './GameTable.styles'
import { useNavigate } from 'react-router-dom'

export const GameTableFooter: React.FC = observer(() => {
  const navigate = useNavigate()
  const room_id = sessionStorage.getItem('room_id')

  const handleStopGame = useCallback(() => {
    gamePlayStore.toggleGameStatus()

    navigate(`/room/${room_id}`)
  }, [selectedDeckStore])

  const handleStartGame = useCallback(() => {
    console.log('Game started', buttons.start_button_label)
    navigate(`/gameplay/${room_id}`)
  }, [])

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleStopGame}
          buttontext={buttons.stop_button_label}
          backgroundColor="#f44336"
        />
        <Button
          onClick={handleStartGame}
          buttontext={buttons.start_game_label}
          backgroundColor="#8e44ad"
        />
      </FooterButtons>
      <Messages>Player 1 logged in</Messages>
      <br />
      <Messages>Player 2 ready</Messages>
    </Footer>
  )
})
