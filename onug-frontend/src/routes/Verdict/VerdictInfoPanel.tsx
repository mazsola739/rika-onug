import { CenterCardsRevealed, InfoPanel, OwnCard, PlayerInfoList } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'

export const VerdictInfoPanel: React.FC = observer(() => {
  const { player, knownPlayerCard, knownPlayerMark, knownPlayerArtifact } = playersStore

  return (
    <InfoPanel>
      {knownPlayerCard && <OwnCard player={player} card={knownPlayerCard} mark={knownPlayerMark} artifact={knownPlayerArtifact} />}
      <span>Center cards</span>
      <CenterCardsRevealed />
      <span>Players</span>
      <PlayerInfoList />
    </InfoPanel>
  )
})
