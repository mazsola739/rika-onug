import { OwnCard, CenterCardsRevealed, PlayerInfoList } from 'components'
import { InfoPanel } from 'layouts'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'
import { Title } from 'typography'

export const VerdictInfoPanel: React.ComponentType = observer(() => {
  const { player, knownPlayerCard, knownPlayerMark, knownPlayerArtifact } = playersStore

  return (
    <InfoPanel>
      {knownPlayerCard && <OwnCard player={player} card={knownPlayerCard} mark={knownPlayerMark} artifact={knownPlayerArtifact} title={'THE CARD LAST KNOWN TO BE YOURS...'} />}
      <Title title={'CENTER CARDS'} />
      <CenterCardsRevealed />
      <Title title={'PLAYER CARDS'} />
      <PlayerInfoList />
    </InfoPanel>
  )
})
