import { Button, ButtonGroup, Card, RoleImage, Title } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { messageStore, propStore, selectionStore } from 'store'
import { CardPosition, Message, MessageBoxCard, MessageText, Narration, NarrationText, StyledAnswer, StyledMessageBox, StyledMessageBoxCards, StyledSelectable } from './MessageBox.styles'
import { AnswersProps, LookProps, MessageBoxCardsProps, SelectableProps } from './MessageBox.types'

const Selectable: React.FC<SelectableProps> = observer(({ selectable, selected }) => {
  return (
    <StyledSelectable>
      <Title title={'Selectable'} />
      <MessageBoxCards cards={selectable} />
      <Title title={'Selected'} />
      <MessageBoxCards cards={selected} />
    </StyledSelectable>
  )
})

const Look: React.FC<LookProps> = observer(({ roles, cards }) => {
  return (
    <StyledSelectable>
      <Title title={roles.join(', ')} />
      <MessageBoxCards cards={cards} />
    </StyledSelectable>
  )
})

const Answer: React.FC<AnswersProps> = observer(({ answer_options }) => {
  const onAnswerClick = (answer: string) => {
    selectionStore.toggleAnswerSelection(answer)
  }

  return (
    <StyledAnswer>
      {answer_options.map((answer_option, index) => {
        const isSelected = answer_option === selectionStore.selectedAnswer
        return <Button key={index} onClick={() => onAnswerClick(answer_option)} variant={isSelected ? 'orange' : 'yellow'} buttonText={answer_option} />
      })}
    </StyledAnswer>
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
  const { handleCardInteraction, handleFinish, handleSkip, handleAnswerInteraction } = useClickHandler()
  const { narration, privateMessage, narrationImage, disabled, isSelectableCards, isIdentification, identifiedCards, isAnswerOptions } = messageStore
  const { obligatory, scene_end, title, answer_options } = propStore
  const { selectedCards, selectedAnswer } = selectionStore

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
        {isAnswerOptions && <Answer answer_options={answer_options} />}
      </Message>
      {!scene_end && isAnswerOptions && (
        <ButtonGroup>
          <Button onClick={() => handleAnswerInteraction(selectedAnswer, title)} disabled={selectedAnswer.length === 0} buttonText={BUTTONS.done_label} variant="green" />
        </ButtonGroup>
      )}
      {!scene_end && isSelectableCards && (
        <ButtonGroup>
          <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={BUTTONS.skip_label} variant="blue" />
          <Button onClick={() => handleCardInteraction(selectedCards, title)} disabled={disabled} buttonText={BUTTONS.done_label} variant="green" />
        </ButtonGroup>
      )}
      {scene_end && (
        <ButtonGroup>
          <Button onClick={() => handleFinish(title)} buttonText={BUTTONS.finish_label} variant="purple" />
        </ButtonGroup>
      )}
    </StyledMessageBox>
  )
})
