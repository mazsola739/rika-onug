import { Header, Main } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledVoting } from './Voting.styles'
import { VotingFooter } from './VotingFooter'

export const Voting: React.FC = observer(() => {
  return (
    <StyledVoting>
      <Header>Header</Header>
      <Main>hai</Main>
      <VotingFooter />
    </StyledVoting>
  )
})
