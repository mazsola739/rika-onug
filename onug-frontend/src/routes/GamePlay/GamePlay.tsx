import { observer } from 'mobx-react-lite'
import { gameTableStore, narrationStore, playerStore, wsStore } from 'store'
import { Button, DealtCards, Header, Main, OwnCard } from 'components'
import {
  ARRIVE_GAME_PLAY,
  HYDRATE_GAME_PLAY,
  INTERACTION,
  REDIRECT,
  STAGES,
} from 'constant'
import { useCallback, useEffect, useState } from 'react'
import { GamePlayHeader } from './GamePlayHeader'
import { useNavigate } from 'react-router-dom'
import {
  GameArea,
  GamePlayContainer,
  MessageBox,
  OwnCardPlace,
  PlayerHand,
  SendButton,
  StyledGamePlay,
} from './GamePlay.styles'
import { GamePlayFooter } from './GamePlayFooter'

export const GamePlay: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const navigate = useNavigate()

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

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
      lastJsonMessage?.type === HYDRATE_GAME_PLAY /* &&
      lastJsonMessage?.success */ //TODO success
    ) {
      narrationStore.setNarration(lastJsonMessage.actual_scene.narration)
      narrationStore.setTitle(lastJsonMessage.actual_scene.scene_title)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage])

  const handleInteraction = useCallback(() => {
    sendJsonMessage?.({
      type: INTERACTION,
      room_id,
      token,
      selected_positions: ['player_2'],
    })
  }, [sendJsonMessage])

  const boardCards = gameTableStore.boardCards
  const players = gameTableStore.players
  const player = playerStore.player

  return (
    <StyledGamePlay>
      <Header>
        <GamePlayHeader />
      </Header>
      <Main>
        <GamePlayContainer>
          <GameArea>
            <DealtCards boardCards={boardCards} players={players} />
          </GameArea>
          <PlayerHand>
            <OwnCardPlace>
              <OwnCard player={player} />
            </OwnCardPlace>
            <MessageBox>
              <span>Message</span>
              <SendButton>
                <Button
                  onClick={handleInteraction}
                  buttonText={'Nyiiihaaaa'}
                  variant="magenta"
                />
              </SendButton>
            </MessageBox>
          </PlayerHand>
        </GamePlayContainer>
      </Main>
      <GamePlayFooter />
    </StyledGamePlay>
  )
})
