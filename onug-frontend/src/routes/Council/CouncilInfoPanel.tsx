import { Button, ButtonGroup, Card, InfoPanel, OwnCard, ReadyList, ResultTable } from 'components'
import { observer } from 'mobx-react-lite'
import { gamePropStore, playersStore, selectionStore, voteStore } from 'store'
import {
  CardPosition,
  MessageBoxCard,
  SelectedTitle,
  Narration,
  NarrationImage,
  NarrationText,
  ReadyStatus,
  ReadyTitle,
  StyledSelectedCards,
  StyledCouncilNarration,
  StyledSuspicion
} from './Council.styles'
import { useClickHandler } from 'hooks'
import { BUTTONS } from 'constant'

const SelectedCards: React.FC = observer(() => {
  const onCardClick = (position: string) => {
    selectionStore.toggleCardSelection(position)
  }
  const { selectedCards } = selectionStore

  return (
    <StyledSelectedCards>
      {selectedCards.map((card, index) => (
        <MessageBoxCard key={index}>
          <CardPosition>{card}</CardPosition>
          <Card image="card_background" onClick={() => onCardClick(card)} size={40} />
        </MessageBoxCard>
      ))}
    </StyledSelectedCards>
  )
})

const CouncilNarration: React.FC = observer(() => {
  return (
    <StyledCouncilNarration>
      {voteStore.narrations &&
        voteStore.voteNarration.map((scene, index) => (
          <Narration key={index}>
            <NarrationImage src={`/assets/cards/${scene.image}.webp`} alt="info" />
            <NarrationText>{scene.text}</NarrationText>
          </Narration>
        ))}
    </StyledCouncilNarration>
  )
})

const Suspicion: React.FC = observer(() => {
  const { handleDone } = useClickHandler()
  const { selectedCards } = selectionStore
  //TODO ℹ️ 🛈 ⓘ ❓tooltipp: you cant vote yourself
  return (
    <StyledSuspicion>
      <SelectedTitle>YOUR SUSPECT</SelectedTitle>
      <SelectedCards />
      <ButtonGroup>
        <Button onClick={() => handleDone(selectedCards)} variant="green" buttonText={BUTTONS.done_label} />
      </ButtonGroup>
    </StyledSuspicion>
  )
})

export const CouncilInfoPanel: React.FC = observer(() => {
  const { players } = playersStore

  return (
    <InfoPanel>
      {gamePropStore.selectable_cards.length === 0 ? (
        <ReadyStatus>
          <ReadyTitle>VOTE NOW?</ReadyTitle>
          {players && <ReadyList players={players} />}
        </ReadyStatus>
      ) : (
        <Suspicion />
      )}
      {voteStore.knownPlayerCard && <OwnCard player={voteStore.knownPlayer} card={voteStore.knownPlayerCard} mark={voteStore.knownPlayerMark} />}
      {<CouncilNarration />}
    </InfoPanel>
  )
})
