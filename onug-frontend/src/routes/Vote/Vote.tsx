import { Header, Main } from 'components'
import { observer } from 'mobx-react-lite'
import { GameArea, StyledVote, Voted } from './Vote.styles'
import { VoteFooter } from './VoteFooter'
import { useVote } from './useVote'

export const Vote: React.FC = observer(() => {
  const { history } = useVote()

  return (
    <StyledVote>
      <Header>
        <pre>{history}</pre>
      </Header>
      <Main>
        <GameArea />
        <Voted>
        </Voted>
      </Main>
      <VoteFooter />
    </StyledVote>
  )
})
