import { observer } from 'mobx-react-lite'
import {
  narrationStore,
  gameBoardStore,
  wsStore,
  gamePlayStore,
  interactionStore,
} from 'store'
import { BoardCards, Header, KnownOwnCard, Main, MessageBox } from 'components'
import {
  ARRIVE_GAME_PLAY,
  HYDRATE_GAME_PLAY,
  INTERACTION,
  REDIRECT,
  STAGES,
} from 'constant'
import { useEffect, useState } from 'react'
import { GamePlayHeader } from './GamePlayHeader'
import { useNavigate } from 'react-router-dom'
import {
  GameArea,
  GamePlayContainer,
  OwnCardPlace,
  PlayerHand,
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
      gameBoardStore.closeYourEyes()
      sendJsonMessage?.({
        type: ARRIVE_GAME_PLAY,
        stage: STAGES.GAME_PLAY,
        room_id,
        token,
      })
    }
  }, [sendJsonMessage, firstTime, gameBoardStore])

  useEffect(() => {
    if (
      lastJsonMessage?.type === HYDRATE_GAME_PLAY /* &&
      lastJsonMessage?.success */ //TODO success
    ) {
      narrationStore.setNarration(lastJsonMessage.actual_scene.narration)
      narrationStore.setTitle(lastJsonMessage.actual_scene.scene_title)
      gamePlayStore.setStartingTime(
        lastJsonMessage.actual_scene.scene_start_time
      )
    }
    if (lastJsonMessage?.type === INTERACTION) {
      interactionStore.setLastJsonMessage(lastJsonMessage)
      interactionStore.setInteraction(lastJsonMessage.title)
      interactionStore.toggleMessageBoxStatus(true)
    }
    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, narrationStore, gamePlayStore])

  return (
    <StyledGamePlay>
      <Header>
        <GamePlayHeader />
      </Header>
      <Main>
        <GamePlayContainer>
          <GameArea>
            <BoardCards />
          </GameArea>
          <PlayerHand>
            <OwnCardPlace>
              <KnownOwnCard player={gameBoardStore.knownPlayer} />
            </OwnCardPlace>
            {interactionStore.hasMessageBox && (
              <MessageBox room_id={room_id} token={token} />
            )}
          </PlayerHand>
        </GamePlayContainer>
      </Main>
      <GamePlayFooter />
    </StyledGamePlay>
  )
})
