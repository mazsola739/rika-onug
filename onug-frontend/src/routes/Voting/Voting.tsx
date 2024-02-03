import { Header } from 'components'
import { observer } from 'mobx-react-lite'
import { Main } from './Voting.styles'
import { VotingFooter } from './VotingFooter'

export const Voting: React.FC = observer(() => {
  return (
    <>
      <Header>Header</Header>
      <Main>hali</Main>
      <VotingFooter />
    </>
  )
})
