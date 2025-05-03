import { Header } from 'layouts'
import { observer } from 'mobx-react-lite'
import { propStore } from 'store'
import { Title } from 'typography'

export const VerdictHeader: React.ComponentType = observer(() => {
  const winners =
    propStore.winnerTeams.length > 0
      ? `THE ${propStore.winnerTeams.length === 1 ? propStore.winnerTeams[0].toLocaleUpperCase() : propStore.winnerTeams.map(team => team.toLocaleUpperCase()).join(' AND ')} TEAM${propStore.winnerTeams.length > 1 ? 'S' : ''
      } WON! `
      : 'NO ONE WON. '

  const losers =
    propStore.loserTeams.length > 0
      ? `THE ${propStore.loserTeams.length === 1 ? propStore.loserTeams[0].toLocaleUpperCase() : propStore.loserTeams.map(team => team.toLocaleUpperCase()).join(' AND ')} TEAM${propStore.loserTeams.length > 1 ? 'S' : ''
      } LOST. `
      : 'NO ONE LOST. '

  const title = ` ${winners}` + ` ${losers}`

  return (
    <Header>
      <Title title={title} />
    </Header>
  )
})
