import { InfoPanel, OwnCard, QuickGuide, ReadyStatus } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'

export const TableInfoPanel: React.FC = observer(() => {
  const { player, knownPlayerCard, knownPlayerMark } = playersStore

  return (
    <InfoPanel>
      <ReadyStatus title={"Ready? No Turning Back!"} />
      {knownPlayerCard && <OwnCard player={player} card={knownPlayerCard} mark={knownPlayerMark} title={'The card you begin the night with'} />}
      <QuickGuide />
    </InfoPanel>
  )
})
