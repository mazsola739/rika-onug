import { CouncilNarration, InfoPanel, OwnCard, ReadyStatus, Suspicion } from 'components'
import { observer } from 'mobx-react-lite'
import { propStore, voteStore } from 'store'

export const CouncilInfoPanel: React.FC = observer(() => {
  return (
    <InfoPanel>
      {propStore.selectable_cards.length === 0 ? <ReadyStatus title={"Are you ready to vote... or are you hiding something? Let's find out!"} /> : <Suspicion />}
      {voteStore.knownPlayerCard && <OwnCard player={voteStore.knownPlayer} card={voteStore.knownPlayerCard} mark={voteStore.knownPlayerMark} />}
      {<CouncilNarration />}
    </InfoPanel>
  )
})
