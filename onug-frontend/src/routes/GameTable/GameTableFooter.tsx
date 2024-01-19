import { Button, Footer, FooterButtons } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { buttons, LEAVE_TABLE, START_GAME } from 'constant'
import { selectedDeckStore, wsStore } from 'store'
import { Messages } from './GameTable.styles'

export const GameTableFooter: React.FC = observer(() => {
  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const handleStopGame = useCallback(() => {
    sendJsonMessage?.({
      type: LEAVE_TABLE,
      room_id,
      token,
    })
  }, [selectedDeckStore])

  const handleStartGame = useCallback(() => {
    sendJsonMessage?.({
      type: START_GAME,
      room_id,
      token,
    })
  }, [sendJsonMessage])

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
