import { Header, KnownOwnCard, Main } from 'components'
import { ARRIVE_VOTING, STAGES } from 'constant'
import { observer } from 'mobx-react-lite'
import { VotedList } from 'modules'
import { useEffect, useState } from 'react'
import { gameBoardStore, wsStore } from 'store'
import {
  GameArea,
  OwnCardPlace,
  PlayerHand,
  StyledGameVote,
  Voted,
} from './Voting.styles'
import { VotingFooter } from './VotingFooter'

export const Voting: React.FC = observer(() => {
  const [firstTime, setFirstTime] = useState(true)
  const [history, setHistory] = useState('')

  const { sendJsonMessage, lastJsonMessage } =
    wsStore.getWsCommunicationsBridge()

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  useEffect(() => {
    if (sendJsonMessage && firstTime) {
      setFirstTime(false)
      sendJsonMessage?.({
        type: ARRIVE_VOTING,
        stage: STAGES.VOTING,
        room_id,
        token,
      })
    }
  }, [sendJsonMessage, firstTime, gameBoardStore])

  useEffect(() => {
    if (!lastJsonMessage?.player_history) return
    setHistory(
      Object.keys(lastJsonMessage.player_history).length === 0
        ? 'You have slept through the night'
        : JSON.stringify(lastJsonMessage.player_history, null, 2)
    )
  }, [lastJsonMessage])

  return (
    <StyledGameVote>
      <Header>
        <pre>{history}</pre>
      </Header>
      <Main>
        <GameArea />
        <PlayerHand>
          <OwnCardPlace>
            <KnownOwnCard player={gameBoardStore.knownPlayer} />
          </OwnCardPlace>
        </PlayerHand>
        <Voted>
          {gameBoardStore.players && (
            <VotedList players={gameBoardStore.players} />
          )}
        </Voted>
      </Main>
      <VotingFooter />
    </StyledGameVote>
  )
})
