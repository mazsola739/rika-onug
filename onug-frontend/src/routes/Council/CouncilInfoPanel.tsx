import { InfoPanel, NightHistory, OwnCard, ReadyStatus, SuspicionCards } from 'components'
import { observer } from 'mobx-react-lite'
import { propStore, voteStore } from 'store'

export const CouncilInfoPanel = observer(() => {
  const { selectable_cards } = propStore
  const { knownPlayer, knownPlayerCard, knownPlayerMark } = voteStore

  return (
    <InfoPanel>
      {selectable_cards.length === 0 ? <ReadyStatus title={"Are you ready to vote... or are you hiding something? Let's find out!"} /> : <SuspicionCards />}
      {knownPlayerCard && <OwnCard player={knownPlayer} card={knownPlayerCard} mark={knownPlayerMark} />}
      <NightHistory />
    </InfoPanel>
  )
})
