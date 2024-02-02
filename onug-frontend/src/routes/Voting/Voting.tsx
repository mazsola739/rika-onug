import { Header } from 'components'
import { observer } from 'mobx-react-lite'
import { Main } from './Voting.styles'
import { VotingFooter } from './VotingFooter'
import { votingUtils } from './Voting.utils'

export const Voting: React.FC = observer(() => {
  const { renderPlayers, renderPlayerCards } = votingUtils

  const players = [
    {
      player_name: 'Wolverine',
      player_number: 1,
      ready: false,
      card: {
        id: 1,
      },
    },
  ]

  return (
    <>
      <Header>Header</Header>
      <Main>
        {players && renderPlayers(players)}
        {players && renderPlayerCards(players)}
      </Main>
      <VotingFooter />
    </>
  )
})
