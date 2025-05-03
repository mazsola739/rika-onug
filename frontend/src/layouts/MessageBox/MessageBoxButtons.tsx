import { observer } from 'mobx-react-lite'
import { Button, ButtonGroup } from 'components'
import { button_label_skip, button_label_vote, button_label_done, button_label_finish } from 'constants'
import { useClickHandler } from 'hooks'
import { propStore, selectionStore } from 'store'

export const SelectableCardsButtons: React.ComponentType = observer(() => {
  const { handleSkip, handleVote, handleCardInteraction } = useClickHandler()
  const { obligatory, title, isVote } = propStore
  const { selectedCards } = selectionStore

  return (
    <ButtonGroup>
      <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={button_label_skip} variant='blue' />
      {isVote ? (
        <Button onClick={() => handleVote(selectedCards, title)} disabled={selectedCards.length === 0} buttonText={button_label_vote} variant='purple' />
      ) : (
        <Button onClick={() => handleCardInteraction(selectedCards, title)} disabled={selectedCards.length === 0} buttonText={button_label_done} variant='green' />
      )}
    </ButtonGroup>
  )
})

export const SelectableMarksButtons: React.ComponentType = observer(() => {
  const { handleSkip, handleVote, handleMarkInteraction } = useClickHandler()
  const { obligatory, title, isVote } = propStore
  const { selectedMarks } = selectionStore

  return (
    <ButtonGroup>
      <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={button_label_skip} variant='blue' />
      {isVote ? (
        <Button onClick={() => handleVote(selectedMarks, title)} disabled={selectedMarks.length === 0} buttonText={button_label_vote} variant='purple' />
      ) : (
        <Button onClick={() => handleMarkInteraction(selectedMarks, title)} disabled={selectedMarks.length === 0} buttonText={button_label_done} variant='green' />
      )}
    </ButtonGroup>
  )
})

export const AnswerButtons: React.ComponentType = observer(() => {
  const { handleSkip, handleAnswerInteraction } = useClickHandler()
  const { obligatory, title } = propStore
  const { selectedAnswer } = selectionStore

  return (
    <ButtonGroup>
      <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={button_label_skip} variant='blue' />
      <Button onClick={() => handleAnswerInteraction(selectedAnswer, title)} disabled={selectedAnswer.length === 0} buttonText={button_label_done} variant='green' />
    </ButtonGroup>
  )
})

export const SceneEndButtons: React.ComponentType = observer(() => {
  const { handleFinish } = useClickHandler()
  const { title } = propStore

  return (
    <ButtonGroup>
      <Button onClick={() => handleFinish(title)} buttonText={button_label_finish} variant='purple' />
    </ButtonGroup>
  )
})
