import { InfoPanel, OwnCard, QuickGuide, ReadyList } from 'components'
import { observer } from 'mobx-react-lite'
import { deckStore, playersStore } from 'store'
import { ReadyStatus, ReadyTitle } from './Table.styles'

export const TableInfoPanel: React.FC = observer(() => {
  const { players } = playersStore

  return (
    <InfoPanel>
      <ReadyStatus><ReadyTitle>START GAME?</ReadyTitle>{players && <ReadyList players={players} />}</ReadyStatus>
      {deckStore.playerCard && <OwnCard player={playersStore.player} card={deckStore.playerCard} mark={deckStore.playerMark}/>}
      <QuickGuide />
    </InfoPanel>
  )
})
