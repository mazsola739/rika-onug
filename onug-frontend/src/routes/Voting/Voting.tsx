import { Header, Main } from "components"
import { ARRIVE_VOTING, STAGES } from "constant"
import { observer } from "mobx-react-lite"
import { useState, useEffect } from "react"
import { wsStore, boardStore } from "store"
import { StyledGameVote, GameArea, PlayerHand, OwnCardPlace, Voted } from "./Voting.styles"
import { VotingFooter } from "./VotingFooter"

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
  }, [sendJsonMessage, firstTime, boardStore])

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
          </OwnCardPlace>
        </PlayerHand>
        <Voted>
        </Voted>
      </Main>
      <VotingFooter />
    </StyledGameVote>
  )
})
