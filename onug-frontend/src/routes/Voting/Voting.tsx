import { Header, Main, KnownOwnCard } from 'components'
import { ARRIVE_VOTING, STAGES } from 'constant'
import { observer } from 'mobx-react-lite'
import { VotedList } from 'modules'
import { useState, useEffect } from 'react'
import { wsStore, gameBoardStore } from 'store'
import { StyledGameVote, GameArea, PlayerHand, OwnCardPlace, Voted } from './Voting.styles'
import { VotingFooter } from './VotingFooter'

export const Voting: React.FC = observer(() => {
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
        type: ARRIVE_VOTING,
        stage: STAGES.VOTING,
        room_id,
        token,
      })
    }
  }, [sendJsonMessage, firstTime, gameBoardStore])

  return (
    <StyledGameVote>
      <Header>Player history?</Header>
      <Main>
        <GameArea />
        <PlayerHand>
          <OwnCardPlace>
            <KnownOwnCard player={gameBoardStore.knownPlayer} />
          </OwnCardPlace>
        </PlayerHand>
        <Voted>{gameBoardStore.players && <VotedList players={gameBoardStore.players} />}</Voted>
      </Main>
      <VotingFooter />
    </StyledGameVote>
  )
})
