import { Button, ButtonGroup, Footer } from 'components'
import { BUTTONS } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { messageStore, propStore, selectionStore } from 'store'

export const GameFooter: React.FC = observer(() => {
  const { handleStopGame, handleCardInteraction, handleMarkInteraction, handleFinish, handleSkip, handleAnswerInteraction, handleVote } = useClickHandler()
  const { disabledCards, disabledMarks, isSelectableCards, isSelectableMarks, isAnswerOptions } = messageStore
  const { obligatory, scene_end, title, isVote } = propStore
  const { selectedCards, selectedMarks, selectedAnswer } = selectionStore

  return (
    <Footer>
      {!scene_end && isSelectableCards && (
        <ButtonGroup>
          <Button onClick={handleStopGame} buttonText={BUTTONS.stop_button_label} variant="red" />
          <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={BUTTONS.skip_label} variant="blue" />
          {isVote ? (
            <Button onClick={() => handleVote(selectedCards, title)} disabled={selectedCards.length === 0} buttonText={BUTTONS.vote_label} variant="yellow" />
          ) : (
            <Button onClick={() => handleCardInteraction(selectedCards, title)} disabled={disabledCards} buttonText={BUTTONS.done_label} variant="green" />
          )}
        </ButtonGroup>
      )}

      {!scene_end && isSelectableMarks && (
        <ButtonGroup>
          <Button onClick={handleStopGame} buttonText={BUTTONS.stop_button_label} variant="red" />
          <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={BUTTONS.skip_label} variant="blue" />
          {isVote ? (
            <Button onClick={() => handleVote(selectedMarks, title)} disabled={selectedMarks.length === 0} buttonText={BUTTONS.vote_label} variant="yellow" />
          ) : (
            <Button onClick={() => handleMarkInteraction(selectedMarks, title)} disabled={disabledMarks} buttonText={BUTTONS.done_label} variant="green" />
          )}
        </ButtonGroup>
      )}

      {!scene_end && isAnswerOptions && (
        <ButtonGroup>
          <Button onClick={handleStopGame} buttonText={BUTTONS.stop_button_label} variant="red" />
          <Button onClick={() => handleAnswerInteraction(selectedAnswer, title)} disabled={selectedAnswer.length === 0} buttonText={BUTTONS.done_label} variant="green" />
        </ButtonGroup>
      )}

      {scene_end && (
        <ButtonGroup>
          <Button onClick={handleStopGame} buttonText={BUTTONS.stop_button_label} variant="red" />
          <Button onClick={() => handleFinish(title)} buttonText={BUTTONS.finish_label} variant="purple" />
        </ButtonGroup>
      )}
    </Footer>
  )
})
