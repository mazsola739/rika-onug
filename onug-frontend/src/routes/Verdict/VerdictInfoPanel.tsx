import { CenterCardsRevealed, InfoPanel, OwnCard, PlayerInfoList } from 'components'
import { observer } from 'mobx-react-lite'
import { voteStore } from 'store'

export const VerdictInfoPanel: React.FC = observer(() => {
  const { knownPlayer, knownPlayerCard, knownPlayerMark, knownPlayerArtifact } = voteStore

  return (
    <InfoPanel>
      {knownPlayerCard && <OwnCard player={knownPlayer} card={knownPlayerCard} mark={knownPlayerMark} artifact={knownPlayerArtifact} />}
      <span>Center cards</span>
      <CenterCardsRevealed />
      <span>Players</span>
      <PlayerInfoList />
    </InfoPanel>
  )
})
