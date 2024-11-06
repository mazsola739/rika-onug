import { Button, ButtonGroup, Card, RoleImage } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { gamePropStore, messageStore, selectionStore } from 'store'
import {
  CardPosition,
  NarrationText,
  Message,
  MessageBoxCard,
  MessageBoxTitle,
  MessageText,
  Narration,
  StyledMessageBox,
  StyledMessageBoxCards,
  StyledSelectable
} from './MessageBox.styles'
import { LookProps, MessageBoxCardsProps, SelectableProps } from './MessageBox.types'

const Selectable: React.FC<SelectableProps> = observer(({ selectable, selected }) => {
  return (
    <StyledSelectable>
      <MessageBoxTitle>Selectable</MessageBoxTitle>
      <MessageBoxCards cards={selectable} />
      <MessageBoxTitle>Selected</MessageBoxTitle>
      <MessageBoxCards cards={selected} />
    </StyledSelectable>
  )
})

const Look: React.FC<LookProps> = observer(({ roles, cards }) => {
  return (
    <StyledSelectable>
      <MessageBoxTitle>{roles.join(', ')}</MessageBoxTitle>
      <MessageBoxCards cards={cards} />
    </StyledSelectable>
  )
})

const MessageBoxCards: React.FC<MessageBoxCardsProps> = observer(({ cards }) => {
  const onCardClick = (position: string) => {
    selectionStore.toggleCardSelection(position)
  }

  return (
    <StyledMessageBoxCards>
      {cards.map((card, index) => (
        <MessageBoxCard key={index}>
          <CardPosition>{card.name}</CardPosition>
          <Card image="card_background" onClick={() => onCardClick(card.position)} size={40} />
        </MessageBoxCard>
      ))}
    </StyledMessageBoxCards>
  )
})

export const MessageBox: React.FC = observer(() => {
  const { handleCardInteraction, handleFinish, handleSkip } = useClickHandler()
  const { narration, privateMessage, narrationImage, disabled, isSelectableCards, isIdentification, identifiedCards } = messageStore
  const { obligatory, scene_end, title } = gamePropStore
  const { selectedCards } = selectionStore

  return (
    <StyledMessageBox>
      <Narration>
        <RoleImage image={narrationImage} size={80} />
        <NarrationText>{narration}</NarrationText>
      </Narration>
      <Message>
        <MessageText>{privateMessage}</MessageText>
        {isSelectableCards && <Selectable selectable={messageStore.allSelectableCards} selected={messageStore.allSelectedCards} />}
        {isIdentification && <Look roles={identifiedCards.roles} cards={identifiedCards.cards} />}
      </Message>
      {!scene_end ? (
        <ButtonGroup>
          <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={BUTTONS.skip_label} variant="blue" />
          <Button onClick={() => handleCardInteraction(selectedCards, title)} disabled={disabled} buttonText={BUTTONS.done_label} variant="green" />
        </ButtonGroup>
      ) : (
        <ButtonGroup>
          <Button onClick={() => handleFinish(title)} buttonText={BUTTONS.finish_label} variant="purple" />
        </ButtonGroup>
      )}
    </StyledMessageBox>
  )
})
