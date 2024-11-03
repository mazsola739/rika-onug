import { InfoPanel, OwnCard, QuickGuide, ReadyList } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore, playersStore } from 'store'
import { ReadyStatus } from './Table.styles'

export const TableInfoPanel: React.FC = observer(() => {
  const { players } = playersStore

  return (
    <InfoPanel>
      <ReadyStatus>{players && <ReadyList players={players} />}</ReadyStatus>
      {deckStore.playerCard && <OwnCard player={playersStore.player} card={deckStore.playerCard} mark={deckStore.playerMark}/>}
      <QuickGuide />
    </InfoPanel>
  )
})
