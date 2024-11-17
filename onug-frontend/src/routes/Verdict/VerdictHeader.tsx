import { Header, Title } from 'components'
import { observer } from 'mobx-react-lite'
import { propStore } from 'store'

const capitalizeFirstLetter = (text: string) => {
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export const VerdictHeader: React.FC = observer(() => {
  const winners =
    propStore.winnerTeams.length > 0
      ? `The ${propStore.winnerTeams.length === 1 ? capitalizeFirstLetter(propStore.winnerTeams[0]) : propStore.winnerTeams.map(team => capitalizeFirstLetter(team)).join(' and ')} team${
          propStore.winnerTeams.length > 1 ? 's' : ''
        } won! `
      : 'No one won '

  const losers =
    propStore.loserTeams.length > 0
      ? `The ${propStore.loserTeams.length === 1 ? capitalizeFirstLetter(propStore.loserTeams[0]) : propStore.loserTeams.map(team => capitalizeFirstLetter(team)).join(' and ')} team${
          propStore.loserTeams.length > 1 ? 's' : ''
        } lost. `
      : 'No one lost. '

  const title = winners && ` ${winners}` + losers && ` ${losers}`

  return (
    <Header>
      <Title title={title} />
    </Header>
  )
})
