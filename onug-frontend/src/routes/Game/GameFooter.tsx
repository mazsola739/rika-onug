import { Button, ButtonGroup, Footer } from 'components'
import { button_label_done, button_label_finish, button_label_skip, button_label_stop, button_label_vote } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { messageStore, propStore, selectionStore } from 'store'

export const GameFooter: React.ComponentType = observer(() => {
  const { handleStopGame, handleCardInteraction, handleMarkInteraction, handleFinish, handleSkip, handleAnswerInteraction, handleVote } = useClickHandler()
  const { disabledCards, disabledMarks, isSelectableCards, isSelectableMarks, isAnswerOptions } = messageStore
  const { obligatory, scene_end, title, isVote } = propStore
  const { selectedCards, selectedMarks, selectedAnswer } = selectionStore

  return (
    <Footer>
      {!scene_end && isSelectableCards && (
        <ButtonGroup>
          <Button onClick={handleStopGame} buttonText={button_label_stop} variant="red" />
          <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={button_label_skip} variant="blue" />
          {isVote ? (
            <Button onClick={() => handleVote(selectedCards, title)} disabled={selectedCards.length === 0} buttonText={button_label_vote} variant="purple" />
          ) : (
            <Button onClick={() => handleCardInteraction(selectedCards, title)} disabled={disabledCards} buttonText={button_label_done} variant="green" />
          )}
        </ButtonGroup>
      )}

      {!scene_end && isSelectableMarks && (
        <ButtonGroup>
          <Button onClick={handleStopGame} buttonText={button_label_stop} variant="red" />
          <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={button_label_skip} variant="blue" />
          {isVote ? (
            <Button onClick={() => handleVote(selectedMarks, title)} disabled={selectedMarks.length === 0} buttonText={button_label_vote} variant="purple" />
          ) : (
            <Button onClick={() => handleMarkInteraction(selectedMarks, title)} disabled={disabledMarks} buttonText={button_label_done} variant="green" />
          )}
        </ButtonGroup>
      )}

      {!scene_end && isAnswerOptions && (
        <ButtonGroup>
          <Button onClick={handleStopGame} buttonText={button_label_stop} variant="red" />
          <Button onClick={() => handleAnswerInteraction(selectedAnswer, title)} disabled={selectedAnswer.length === 0} buttonText={button_label_done} variant="green" />
        </ButtonGroup>
      )}

      {scene_end && (
        <ButtonGroup>
          <Button onClick={handleStopGame} buttonText={button_label_stop} variant="red" />
          <Button onClick={() => handleFinish(title)} buttonText={button_label_finish} variant="purple" />
        </ButtonGroup>
      )}
    </Footer>
  )
})
