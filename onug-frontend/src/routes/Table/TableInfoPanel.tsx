import { InfoPanel, OwnCard, QuickGuide, ReadyStatus } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'

export const TableInfoPanel: React.FC = observer(() => {
  const { player, knownPlayerCard, knownPlayerMark } = playersStore

  return (
    <InfoPanel>
      <ReadyStatus title={'READY? NO TURNING BACK!'} />
      {knownPlayerCard && <OwnCard player={player} card={knownPlayerCard} mark={knownPlayerMark} title={'THE CARD YOU BEGIN THE NIGHT WITH'} />}
      <QuickGuide />
    </InfoPanel>
  )
})
