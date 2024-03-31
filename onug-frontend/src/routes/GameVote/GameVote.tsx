import { Header, Main, BoardCards, KnownOwnCard, VotedList } from 'components'
import { observer } from 'mobx-react-lite'
import { gameBoardStore, wsStore } from 'store'
import { StyledGameVote, GameArea, PlayerHand, OwnCardPlace, Voted } from './GameVote.styles'
import { GameVoteFooter } from './GameVoteFooter'
import { useEffect, useState } from 'react'
import { ARRIVE_GAME_VOTE, STAGES } from 'constant'

export const GameVote: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      gameBoardStore.closeYourEyes()
      sendJsonMessage?.({
        type: ARRIVE_GAME_VOTE,
        stage: STAGES.GAME_VOTE,
        room_id,
        token,
      })
    }
  }, [sendJsonMessage, firstTime, gameBoardStore])

  return (
    <StyledGameVote>
      <Header>Player history?</Header>
      <Main>
        <GameArea>
          <BoardCards />
        </GameArea>
        <PlayerHand>
          <OwnCardPlace>
            <KnownOwnCard player={gameBoardStore.knownPlayer} />
          </OwnCardPlace>
        </PlayerHand>
        <Voted>{gameBoardStore.players && <VotedList players={gameBoardStore.players} />}</Voted>
      </Main>
      <GameVoteFooter />
    </StyledGameVote>
  )
})
