import { Button, Footer, FooterButtons } from 'components'
import { observer } from 'mobx-react-lite'
import { useCallback, useState } from 'react'
import { buttons, LEAVE_TABLE, READY, START_GAME } from 'constant'
import { wsStore } from 'store'

export const GameTableFooter: React.FC = observer(() => {
  const [ready, setReady] = useState(false)

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  const handleStopGame = useCallback(() => {
    sendJsonMessage?.({
      type: LEAVE_TABLE,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleStartGame = useCallback(() => {
    sendJsonMessage?.({
      type: START_GAME,
      room_id,
      token,
    })
  }, [sendJsonMessage])

  const handleReady = useCallback(() => {
    sendJsonMessage?.({
      type: READY,
      token,
      room_id,
    })
    setReady(!ready)
  }, [sendJsonMessage, setReady, ready])

  return (
    <Footer>
      <FooterButtons>
        <Button
          onClick={handleStopGame}
          buttonText={buttons.stop_button_label}
          variant="red"
        />
        <Button
          onClick={handleStartGame}
          buttonText={buttons.start_game_label}
          variant="purple"
        />
        <Button
          onClick={handleReady}
          variant="green"
          buttonText={ready ? buttons.im_ready_label : buttons.ready_label}
        />
      </FooterButtons>
    </Footer>
  )
})
