import { OwnCard, ReadyStatus, SuspicionPlayers, NightHistory } from 'components'
import { InfoPanel } from 'layouts'
import { observer } from 'mobx-react-lite'
import { propStore, playersStore } from 'store'
import { Title } from 'typography'

export const CouncilInfoPanel = observer(() => {
  const { selectable_cards } = propStore
  const { player, knownPlayerCard, knownPlayerMark, knownPlayerArtifact } = playersStore
  const { end } = propStore

  return (
    <InfoPanel>
      {knownPlayerCard && <OwnCard player={player} card={knownPlayerCard} mark={knownPlayerMark} artifact={knownPlayerArtifact} title={'THE CARD YOU BELIEVE TO BE YOURS...'} />}
      {!end && selectable_cards.length === 0 ? <ReadyStatus title={'READY TO VOTE AND UNMASK?'} /> : !end && <SuspicionPlayers />}
      <Title title={'PREVIOUSLY ON NIGHT...'} />
      <NightHistory />
    </InfoPanel>
  )
})
