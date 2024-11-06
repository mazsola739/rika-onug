import { InfoPanel, OwnCard, ReadyList } from 'components'
import { observer } from 'mobx-react-lite'
import { gamePropStore, playersStore, selectionStore, voteStore } from 'store'
import { Narration, NarrationImage, NarrationText, ReadyStatus, ReadyTitle } from './Vote.styles'

export const VoteInfoPanel: React.FC = observer(() => {
  const { players } = playersStore
  const { selectedCards } = selectionStore

  return (
    <InfoPanel>
      {gamePropStore.selectable_cards.length === 0 ? (
        <ReadyStatus>
          <ReadyTitle>VOTE NOW?</ReadyTitle>
          {players && <ReadyList players={players} />}
        </ReadyStatus>
      ) : (
        <span>Selected cards: {selectedCards}</span>
      )}
      {voteStore.knownPlayerCard && <OwnCard player={voteStore.knownPlayer} card={voteStore.knownPlayerCard} mark={voteStore.knownPlayerMark} />}
      {voteStore.narrations &&
        voteStore.voteNarration.map((scene, index) => (
          <Narration key={index}>
            <NarrationImage src={`/assets/cards/${scene.image}.webp`} alt="info" />
            <NarrationText>{scene.text}</NarrationText>
          </Narration>
        ))}
    </InfoPanel>
  )
})
