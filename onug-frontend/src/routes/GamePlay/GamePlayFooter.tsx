import { observer } from 'mobx-react-lite'
import { gamePlayStore, wsStore } from 'store'
import { Button, Footer, FooterButtons } from 'components'
import { PAUSE_GAME, STOP_GAME, buttons } from 'constant'
import { useCallback } from 'react'

export const GamePlayFooter: React.FC = observer(() => {
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const buttonText = gamePlayStore.isGamePaused
    ? buttons.pause_button_alt_label
    : buttons.pause_button_label

  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  const handlePauseGame = useCallback(() => {
    sendJsonMessage?.({
      type: PAUSE_GAME,
      room_id,
      token,
    })
  }, [])

  const handleStopGame = useCallback(() => {
    sendJsonMessage?.({
      type: STOP_GAME,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handlePauseGame}
          buttonText={buttonText}
          variant="orange"
        />
        <Button
          onClick={handleStopGame}
          buttonText={buttons.stop_button_label}
          variant="red"
        />
      </FooterButtons>
    </Footer>
  )
})
