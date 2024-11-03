import { InfoPanel, OwnCard, QuickGuide, ReadyList } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore, voteStore } from 'store'
import { Placeholder, ReadyStatus } from './Vote.styles'

export const VoteInfoPanel: React.FC = observer(() => {
  const { players } = playersStore

  return (
    <InfoPanel>
      <Placeholder>egyelőre semmi</Placeholder>
      <ReadyStatus>{players && <ReadyList players={players} />}</ReadyStatus>
      <OwnCard card={voteStore.knownPlayerCard} mark={voteStore.knownPlayerMark} />
      <QuickGuide />
    </InfoPanel>
  )
})
