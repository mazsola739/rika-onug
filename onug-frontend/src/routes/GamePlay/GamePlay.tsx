import { observer } from 'mobx-react-lite'
import { gameTableStore, narrationStore, playerStore, wsStore } from 'store'
import { DealtCards, Header, Main, OwnCard } from 'components'
import { ARRIVE_GAME_PLAY, HYDRATE_GAME_PLAY, REDIRECT, STAGES } from 'constant'
import { useEffect, useState } from 'react'
import { GamePlayHeader } from './GamePlayHeader'
import { useNavigate } from 'react-router-dom'
import {
  GameArea,
  MessageBox,
  OwnCardPlace,
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

  let narration

  useEffect(() => {
    if (
      lastJsonMessage?.type === HYDRATE_GAME_PLAY /* &&
      lastJsonMessage?.success */ //TODO success
    ) {
      narration = lastJsonMessage.actual_scene.narration
      narrationStore.setNarration(lastJsonMessage.actual_scene.narration)
    }

    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage])

  const boardCards = gameTableStore.boardCards
  const players = gameTableStore.players
  const player = playerStore.player

  return (
    <StyledGamePlay>
      <Header>
        <GamePlayHeader narration={narration} />
      </Header>
      <Main>
        <OwnCardPlace>
          <OwnCard player={player} />
        </OwnCardPlace>
        <GameArea>
          <DealtCards boardCards={boardCards} players={players} />
        </GameArea>
        <MessageBox>'chat' here</MessageBox>
      </Main>
      <GamePlayFooter />
    </StyledGamePlay>
  )
})
