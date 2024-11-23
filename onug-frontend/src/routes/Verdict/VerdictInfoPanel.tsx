import { CenterCardsRevealed, InfoPanel, OwnCard, PlayerInfoList, Title } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore } from 'store'

export const VerdictInfoPanel: React.FC = observer(() => {
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
