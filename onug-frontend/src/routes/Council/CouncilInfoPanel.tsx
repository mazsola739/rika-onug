import { CouncilNarration, InfoPanel, OwnCard, ReasyStatus, Suspicion } from 'components'
import { observer } from 'mobx-react-lite'
import { propStore, voteStore } from 'store'

export const CouncilInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      {propStore.selectable_cards.length === 0 ? <ReasyStatus /> : <Suspicion />}
      {voteStore.knownPlayerCard && <OwnCard player={voteStore.knownPlayer} card={voteStore.knownPlayerCard} mark={voteStore.knownPlayerMark} />}
      {<CouncilNarration />}
    </InfoPanel>
  )
})
