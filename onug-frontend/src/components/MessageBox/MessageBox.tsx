import { Button, ButtonGroup, CardImage, RoleImage, Title, TokenImage } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { messageStore, propStore, selectionStore } from 'store'
import {
  ItemPosition,
  Message,
  MessageBoxItem,
  MessageText,
  Narration,
  NarrationText,
  PlayerPosition,
  StyledAnswer,
  StyledMessageBox,
  StyledMessageBoxCards,
  StyledSelectable,
  StyledVoteResult
} from './MessageBox.styles'
import { AnswersProps, LookProps, MessageBoxProps, SelectableProps, SelectedMarksProps, VoteProps, VoteResultProps } from './MessageBox.types'
import { formatPositionSimply } from 'utils'

const SelectableCards: React.FC<SelectableProps> = observer(({ selectableCards, selected }) => {
  return (
    <StyledSelectable>
      <Title title={'SELECTABLE CARDS'} />
      <MessageBoxCards cards={selectableCards} />
      <Title title={'SELECTED CARDS'} />
      <MessageBoxCards cards={selected} />
    </StyledSelectable>
  )
})

const SelectableMarks: React.FC<SelectableProps> = observer(({ selectableMarks, selected }) => {
  return (
    <StyledSelectable>
      <Title title={'SELECTABLE MARKS'} />
      <MessageBoxMarks marks={selectableMarks} />
      <Title title={'SELECTED MARKS'} />
      <MessageBoxMarks marks={selected} />
    </StyledSelectable>
  )
})

const SelectedMarks: React.FC<SelectedMarksProps> = observer(({ selectedMarks }) => {
  return (
    <StyledSelectable>
      <Title title={'SELECTED MARKS'} />
      <MessageBoxSelectedMarks selectedMarks={selectedMarks} />
    </StyledSelectable>
  )
})

const MessageBoxSelectedMarks: React.FC<SelectedMarksProps> = observer(({ selectedMarks }) => {
  return (
    <StyledMessageBoxCards>
      {selectedMarks.map((mark, index) => (
        <MessageBoxItem key={index}>
          <ItemPosition>{mark}</ItemPosition>
          <TokenImage image="mark_back"  size={40} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})

const LookCards: React.FC<LookProps> = observer(({ roles, cards }) => {
  return (
    <StyledSelectable>
      <Title title={roles.join(', ')} />
      <MessageBoxCards cards={cards} />
    </StyledSelectable>
  )
})

const LookMarks: React.FC<LookProps> = observer(({ roles, marks }) => {
  return (
    <StyledSelectable>
      <Title title={roles.join(', ')} />
      <MessageBoxMarks marks={marks} />
    </StyledSelectable>
  )
})

const MessageBoxCards: React.FC<MessageBoxProps> = observer(({ cards }) => {
  const onCardClick = (position: string) => {
    selectionStore.toggleCardSelection(position)
  }

  return (
    <StyledMessageBoxCards>
      {cards.map((card, index) => (
        <MessageBoxItem key={index}>
          <ItemPosition>{card.name}</ItemPosition>
          <CardImage image="card_background" onClick={() => onCardClick(card.position)} size={40} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})

const MessageBoxMarks: React.FC<MessageBoxProps> = observer(({ marks }) => {
  const onMarkClick = (position: string) => {
    selectionStore.toggleMarkSelection(position)
  }

  return (
    <StyledMessageBoxCards>
      {marks.map((mark, index) => (
        <MessageBoxItem key={index}>
          <ItemPosition>{mark.name}</ItemPosition>
          <TokenImage image="mark_back" onClick={() => onMarkClick(mark.position)} size={40} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
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

const Vote: React.FC<VoteProps> = observer(({ options }) => {
  const onAnswerClick = (answer: string) => {
    selectionStore.toggleAnswerSelection(answer)
  }

  return (
    <StyledAnswer>
      {options.map((option, index) => {
        const isSelected = option === selectionStore.selectedAnswer
        return <Button key={index} onClick={() => onAnswerClick(option)} variant={isSelected ? 'orange' : 'yellow'} buttonText={formatPositionSimply(option)} />
      })}
    </StyledAnswer>
  )
})

const VoteResult: React.FC<VoteResultProps> = observer(({ votes }) => {
  return (
    <StyledVoteResult>
      {Object.entries(votes).map(([key, values]) => (
        <div key={key}>
          <PlayerPosition>{formatPositionSimply(key)}</PlayerPosition>
          {values.map(value => (
            <TokenImage key={value} image={value} size={30} />
          ))}
        </div>
      ))}
    </StyledVoteResult>
  )
})

export const MessageBox: React.FC = observer(() => {
  const { handleCardInteraction, handleMarkInteraction, handleFinish, handleSkip, handleAnswerInteraction, handleVote } = useClickHandler()
  const {
    narration,
    privateMessage,
    narrationImage,
    disabledCards,
    disabledMarks,
    isSelectableCards,
    isSelectableMarks,
    isCardIdentification,
    identifiedCards,
    isAnswerOptions,
    isVoteResult,
    isSelectedMarks
  } = messageStore
  const { obligatory, scene_end, title, answer_options, vampireVotes, isVote, selected_marks } = propStore
  const { selectedCards, selectedMarks, selectedAnswer } = selectionStore

  return (
    <StyledMessageBox>
      <Narration>
        <RoleImage image={narrationImage} size={80} />
        <NarrationText>{narration}</NarrationText>
      </Narration>
      <Message>
        <MessageText>{privateMessage}</MessageText>
        {isCardIdentification && <LookCards roles={identifiedCards.roles} cards={identifiedCards.cards} />}

        {isSelectedMarks && !isVote &&<SelectedMarks selectedMarks={selected_marks} />}

        {isSelectableCards && !isVote && <SelectableCards selectableCards={messageStore.allSelectableCards} selected={messageStore.allSelectedCards} />}
        {isSelectableMarks && !isVote && <SelectableMarks selectableMarks={messageStore.allSelectableMarks} selected={messageStore.allSelectedMarks} />}
        {isAnswerOptions && !isVote && <Answer answer_options={answer_options} />}

        {isVote && <Vote options={messageStore.selectableOptions} />}
        {isVoteResult && <VoteResult votes={vampireVotes} />}
      </Message>
      {!scene_end && isVote && (
        <ButtonGroup>
          <Button onClick={() => handleVote(selectedAnswer, title)} disabled={selectedAnswer.length === 0} buttonText={BUTTONS.done_label} variant="green" />
        </ButtonGroup>
      )}
      {!scene_end && isSelectableCards && !isVote && (
        <ButtonGroup>
          <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={BUTTONS.skip_label} variant="blue" />
          <Button onClick={() => handleCardInteraction(selectedCards, title)} disabled={disabledCards} buttonText={BUTTONS.done_label} variant="green" />
        </ButtonGroup>
      )}
      {!scene_end && (isSelectableMarks || isSelectedMarks) && !isVote && (
        <ButtonGroup>
          <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={BUTTONS.skip_label} variant="blue" />
          <Button onClick={() => handleMarkInteraction(selectedMarks, title)} disabled={disabledMarks} buttonText={BUTTONS.done_label} variant="green" />
        </ButtonGroup>
      )}
      {!scene_end && isAnswerOptions && !isVote && (
        <ButtonGroup>
          <Button onClick={() => handleAnswerInteraction(selectedAnswer, title)} disabled={selectedAnswer.length === 0} buttonText={BUTTONS.done_label} variant="green" />
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
