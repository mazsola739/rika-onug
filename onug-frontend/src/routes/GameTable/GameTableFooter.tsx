import { Footer, FooterButtons, Button } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect } from 'react'
import { HYDRATE_GAME_PLAY, LEAVE_TABLE, REDIRECT, buttons } from 'constant'
import { gamePlayStore, selectedDeckStore, wsStore } from 'store'
import { Messages } from './GameTable.styles'
import { useNavigate } from 'react-router-dom'

export const GameTableFooter: React.FC = observer(() => {
  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  const navigate = useNavigate()
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (
      lastJsonMessage?.type === HYDRATE_GAME_PLAY &&
      lastJsonMessage.success
    ) {
      console.log(`TODO handle hydrate ready state: ${lastJsonMessage}`)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      gamePlayStore.toggleGameStatus()
      navigate(lastJsonMessage.path)
    }
  }, [sendJsonMessage, lastJsonMessage])

  const handleStopGame = useCallback(() => {
    sendJsonMessage({
      type: LEAVE_TABLE,
      room_id,
      token,
    })
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
