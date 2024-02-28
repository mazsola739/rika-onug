import {
  BoardCards,
  Header,
  KnownOwnCard,
  Main,
  MessageBox,
  VotedList,
} from 'components'
import { observer } from 'mobx-react-lite'
import {
  GameArea,
  OwnCardPlace,
  PlayerHand,
  Voted,
  StyledGameVote,
} from './GameVote.styles'
import { GameVoteFooter } from './GameVoteFooter'
import { gameBoardStore, interactionStore } from 'store'

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
