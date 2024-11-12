import { InfoPanel, OwnCard, QuickGuide, ReadyStatus } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'

export const TableInfoPanel: React.FC = observer(() => {
  const { player, knownPlayerCard, knownPlayerMark } = playersStore

  return (
    <InfoPanel>
      <ReadyStatus title={"Beware! Once we start, there's no turning back. Are you ready?"} />
      {knownPlayerCard && <OwnCard player={player} card={knownPlayerCard} mark={knownPlayerMark} />}
      <QuickGuide />
    </InfoPanel>
  )
})
