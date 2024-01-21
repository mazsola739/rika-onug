import { observer } from 'mobx-react-lite'
import { StyledGamePlay } from './GamePlay.styles'
import { gamePlayStore, wsStore } from 'store'
import { Button, Footer, FooterButtons, Header } from 'components'
import {
  ARRIVE_GAME_PLAY,
  HYDRATE_GAME_PLAY,
  PAUSE_GAME,
  REDIRECT,
  STAGES,
  STOP_GAME,
  buttons,
} from 'constant'
import { useCallback, useEffect, useState } from 'react'
import { GamePlayHeader } from './GamePlayHeader'
import { useNavigate } from 'react-router-dom'

export const GamePlay: React.FC = observer(() => {
  const navigate = useNavigate()
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const [firstTime, setFirstTime] = useState(true)
  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_GAME_PLAY,
        stage: STAGES.GAME_PLAY,
        room_id: sessionStorage.getItem('room_id'),
        token,
      })
    }
  }, [sendJsonMessage, firstTime])

  useEffect(() => {
    if (
      lastJsonMessage?.type === HYDRATE_GAME_PLAY &&
      lastJsonMessage?.success
    ) {
      console.log(lastJsonMessage)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage])

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

  const buttonText = gamePlayStore.isGamePaused
    ? buttons.pause_button_alt_label
    : buttons.pause_button_label

  return (
    <>
      <Header>
        <GamePlayHeader />
      </Header>
      <StyledGamePlay>here comes the table</StyledGamePlay>
      <Footer>
        <FooterButtons>
          <Button
            onClick={handlePauseGame}
            buttontext={buttonText}
            backgroundColor="#ff9800"
          />
          <Button
            onClick={handleStopGame}
            buttontext={buttons.stop_button_label}
            backgroundColor="#f44336"
          />
        </FooterButtons>
      </Footer>
    </>
  )
})
