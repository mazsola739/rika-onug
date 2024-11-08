import { InfoPanel, OwnCard, QuickGuide, ReadyStatus } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore, playersStore } from 'store'

export const TableInfoPanel: React.FC = observer(() => {


  return (
    <InfoPanel>
      <ReadyStatus title={"Beware! Once we start, there's no turning back. Are you ready?"} />
      {deckStore.playerCard && <OwnCard player={playersStore.player} card={deckStore.playerCard} mark={deckStore.playerMark} />}
      <QuickGuide />
    </InfoPanel>
  )
})
