import { Header } from 'components'
import { observer } from 'mobx-react-lite'
import { Main } from './Voting.styles'
import { VootingFooter } from './VootingFooter'
import { votingUtils } from './Voting.utils'

export const Voting: React.FC = observer(() => {
  const { renderPlayers, renderPlayerCards } = votingUtils
  const players = [
    {
      player_name: 'Wolverine',
      player_number: 1,
      ready: false,
    },
    {
      player_name: 'Aquaman',
      player_number: 2,
      ready: true,
    },
    {
      player_name: 'Thor',
      player_number: 3,
      ready: false,
    },
    {
      player_name: 'Groot',
      player_number: 4,
      ready: true,
    },
    {
      player_name: 'Thanos',
      player_number: 5,
      ready: false,
    },
    {
      player_name: 'Spider-Man',
      player_number: 6,
      ready: false,
    },
    {
      player_name: 'Deadpool',
      player_number: 7,
      ready: true,
    },
    {
      player_name: 'Iron Man',
      player_number: 8,
      ready: false,
    },
    {
      player_name: 'Loki',
      player_number: 9,
      ready: true,
    },
    {
      player_name: 'Wonder Woman',
      player_number: 10,
      ready: false,
    },
    {
      player_name: 'Batman',
      player_number: 11,
      ready: false,
    },
    {
      player_name: 'Superman',
      player_number: 12,
      ready: true,
    },
  ]

  return (
    <>
      <Header>Header</Header>
      <Main>
        {players && renderPlayers(players)}
        {players && renderPlayerCards(players)}
      </Main>
      <VootingFooter />
    </>
  )
})
