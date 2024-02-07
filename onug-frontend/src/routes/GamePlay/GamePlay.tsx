import { observer } from 'mobx-react-lite'
import { narrationStore, gameBoardStore, wsStore, gamePlayStore } from 'store'
import { BoardCards, Button, Header, Main, OwnCard } from 'components'
import { ARRIVE_GAME_PLAY, HYDRATE_GAME_PLAY, REDIRECT, STAGES } from 'constant'
import { useEffect, useState } from 'react'
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
import { useClickHandler } from 'hooks'

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
      console.log(JSON.stringify(lastJsonMessage.actual_scene.scene_start_time))
      narrationStore.setNarration(lastJsonMessage.actual_scene.narration)
      narrationStore.setTitle(lastJsonMessage.actual_scene.scene_title)
      gamePlayStore.setStartingTime(
        lastJsonMessage.actual_scene.scene_start_time
      )
    }
    if (lastJsonMessage?.type === REDIRECT) {
      navigate(lastJsonMessage.path)
    }
  }, [lastJsonMessage, narrationStore, gamePlayStore])

  const { handleInteraction } = useClickHandler(room_id, token)

  const { player } = gameBoardStore

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
