import { InfoPanel, OwnCard, ReadyList, RoleImage } from 'components'
import { observer } from 'mobx-react-lite'
import { playersStore, voteStore } from 'store'
import { MessageText, Narration, ReadyStatus } from './Vote.styles'

export const VoteInfoPanel: React.FC = observer(() => {
  const { players } = playersStore

  return (
    <InfoPanel>
      <ReadyStatus>{players && <ReadyList players={players} />}</ReadyStatus>
      {voteStore.knownPlayerCard && (
        <OwnCard player={voteStore.knownPlayer} card={voteStore.knownPlayerCard} mark={voteStore.knownPlayerMark} />
      )}
      {voteStore.narrations &&
        voteStore.voteNarration.map((scene, index) => (
          <Narration key={index}>
            <RoleImage image={scene.image} size={80} />
            <MessageText>{scene.text}</MessageText>
          </Narration>
        ))}
    </InfoPanel>
  )
})
