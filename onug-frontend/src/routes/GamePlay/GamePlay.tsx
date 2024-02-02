import { observer } from 'mobx-react-lite'
import { StyledGamePlay } from './GamePlay.styles'
import { gamePlayStore, wsStore } from 'store'
import { Button, Footer, FooterButtons, Header } from 'components'
import {
  ARRIVE_GAME_PLAY,
  HYDRATE_GAME_PLAY,
  INTERACTION,
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
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const buttonText = gamePlayStore.isGamePaused
    ? buttons.pause_button_alt_label
    : buttons.pause_button_label

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_GAME_PLAY,
        stage: STAGES.GAME_PLAY,
        room_id,
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

  const handleInteraction = useCallback(() => {
    sendJsonMessage?.({
      type: INTERACTION,
      room_id,
      token,
      selected_positions: ['player_2'],
    })
  }, [sendJsonMessage])

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
            buttonText={buttonText}
            variant="orange"
          />
          <Button
            onClick={handleStopGame}
            buttonText={buttons.stop_button_label}
            variant="red"
          />
          <Button
            onClick={handleInteraction}
            buttonText={'Nyiiihaaaa'}
            variant="magenta"
          />
        </FooterButtons>
      </Footer>
    </>
  )
})
