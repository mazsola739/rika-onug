import { Header, Main, BoardCards, KnownOwnCard, MessageBox, VotedList } from 'components'
import { observer } from 'mobx-react-lite'
import { gameBoardStore, interactionStore } from 'store'
import { StyledGameVote, GameArea, PlayerHand, OwnCardPlace, Voted } from './GameVote.styles'
import { GameVoteFooter } from './GameVoteFooter'

export const GameVote: React.FC = observer(() => {
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
          {interactionStore.hasMessageBox && <MessageBox />}
        </PlayerHand>
        <Voted>{gameBoardStore.players && <VotedList players={gameBoardStore.players} />}</Voted>
      </Main>
      <GameVoteFooter />
    </StyledGameVote>
  )
})
