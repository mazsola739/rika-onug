import { Header, Main, BoardCards, SceneTracker, KnownOwnCard, MessageBox } from 'components'
import { ARRIVE_GAME_PLAY, STAGES, SCENE, HYDRATE_GAME_PLAY, MESSAGE, REDIRECT } from 'constant'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { wsStore, gameBoardStore, narrationStore, interactionStore, gamePlayStore } from 'store'
import { StyledGamePlay, GamePlayContainer, GameArea, PlayerHand, OwnCardPlace } from './GamePlay.styles'
import { GamePlayFooter } from './GamePlayFooter'
import { GamePlayHeader } from './GamePlayHeader'

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
    if (lastJsonMessage?.type === SCENE) {
      narrationStore.setNarration(lastJsonMessage.narration)
      interactionStore.setLastJsonMessage(lastJsonMessage)

      if (Object.keys(lastJsonMessage.interaction).length > 0) {
        interactionStore.setMessage(lastJsonMessage.interaction.private_message)
        interactionStore.setMessageIcon(lastJsonMessage.interaction.icon)
        interactionStore.setInteraction(lastJsonMessage.interaction.title)
        interactionStore.toggleMessageBoxStatus(true)
      }
    }
    if (lastJsonMessage?.type === HYDRATE_GAME_PLAY) {
      /* && lastJsonMessage?.success */ //TODO success
      narrationStore.setTitle(lastJsonMessage.actual_scene.scene_title)
      gamePlayStore.setStartingTime(
        lastJsonMessage.actual_scene.scene_start_time
      )
    }
    if (lastJsonMessage?.type === MESSAGE) {
      interactionStore.toggleMessageBoxStatus(true)
    }
    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, narrationStore, gamePlayStore, interactionStore])

  return (
    <StyledGamePlay>
      <Header>
        <GamePlayHeader />
      </Header>
      <Main>
        <GamePlayContainer>
          <GameArea>
            <BoardCards />
            <SceneTracker />
          </GameArea>
          <PlayerHand>
            <OwnCardPlace>
              <KnownOwnCard player={gameBoardStore.knownPlayer} />
            </OwnCardPlace>
            {interactionStore.hasMessageBox && <MessageBox />}
          </PlayerHand>
        </GamePlayContainer>
      </Main>
      <GamePlayFooter />
    </StyledGamePlay>
  )
})
