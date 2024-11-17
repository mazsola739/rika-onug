import { Header, Title } from 'components'
import { observer } from 'mobx-react-lite'
import { propStore } from 'store'

export const VerdictHeader: React.FC = observer(() => {
  const winners =
    propStore.winnerTeams.length > 0
      ? `THE ${propStore.winnerTeams.length === 1 ? propStore.winnerTeams[0].toLocaleUpperCase() : propStore.winnerTeams.map(team => team.toLocaleUpperCase()).join(' AND ')} TEAM${
          propStore.winnerTeams.length > 1 ? 'S' : ''
        } WON! `
      : 'NO ONE WON. '

  const losers =
    propStore.loserTeams.length > 0
      ? `THE ${propStore.loserTeams.length === 1 ? propStore.loserTeams[0].toLocaleUpperCase() : propStore.loserTeams.map(team => team.toLocaleUpperCase()).join(' AND ')} TEAM${
          propStore.loserTeams.length > 1 ? 'S' : ''
        } LOST. `
      : 'NO ONE LOST. '

  const title = winners && ` ${winners}` + losers && ` ${losers}`

  return (
    <Header>
      <Title title={title} />
    </Header>
  )
})
