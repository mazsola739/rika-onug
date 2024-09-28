import { Header, Main, KnownOwnCard } from 'components'
import { ARRIVE_GAME, STAGES, SCENE, HYDRATE_GAME, MESSAGE, REDIRECT } from 'constant'
import { observer } from 'mobx-react-lite'
import { BoardCards, SceneTracker, MessageBox } from 'modules'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { wsStore, gameBoardStore, narrationStore, interactionStore, gameStore } from 'store'
import { StyledGamePlay, GamePlayContainer, GameArea, PlayerHand, OwnCardPlace } from './Game.styles'
import { GameFooter } from './GameFooter'
import { GameHeader } from './GameHeader'

export const Game: React.FC = observer(() => {
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
        type: ARRIVE_GAME,
        stage: STAGES.GAME,
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
    if (lastJsonMessage?.type === HYDRATE_GAME) {
      /* && lastJsonMessage?.success */ //TODO success?
      narrationStore.setTitle(lastJsonMessage.actual_scene.scene_title)
      gameStore.setStartingTime(
        lastJsonMessage.actual_scene.scene_start_time
      )
      gameStore.setEndingTime(
        lastJsonMessage.actual_scene.scene_end_time
      )
    }
    if (lastJsonMessage?.type === MESSAGE) {
      interactionStore.toggleMessageBoxStatus(true)
    }
    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, narrationStore, gameStore, interactionStore])

  return (
    <StyledGamePlay>
      <Header>
        <GameHeader />
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
      <GameFooter />
    </StyledGamePlay>
  )
})
