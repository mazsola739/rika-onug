import { Button, ButtonGroup, RoleImage } from 'components'
import { button_label_skip, button_label_vote, button_label_done, button_label_finish } from 'constant'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { messageStore, propStore, selectionStore } from 'store'
import { MessageBoxAnswer, MessageBoxLook, MessageBoxSelectableCards, MessageBoxSelectableMarks, MessageBoxVoteResult } from '.'
import { StyledMessageBox, Narration, NarrationText, Message, MessageText } from './MessageBox.styles'

export const MessageBox: React.FC = observer(() => {
  const { handleCardInteraction, handleMarkInteraction, handleFinish, handleSkip, handleAnswerInteraction, handleVote } = useClickHandler()
  const { narration, privateMessage, narrationImage, disabledCards, disabledMarks, isSelectableCards, isSelectableMarks, isPlayerIdentification, identifiedPlayers, isAnswerOptions, isVoteResult } =
    messageStore
  const { obligatory, scene_end, title, answer_options, vampireVotes, alienVotes, isVote } = propStore
  const { selectedCards, selectedMarks, selectedAnswer } = selectionStore

  const votes = alienVotes || vampireVotes

  return (
    <StyledMessageBox>
      <Narration>
        <RoleImage image={narrationImage} size={80} />
        <NarrationText>{narration}</NarrationText>
      </Narration>
      <Message>
        <MessageText>{privateMessage}</MessageText>
        {isPlayerIdentification && <MessageBoxLook roles={identifiedPlayers.roles} players={identifiedPlayers.players} />}

        {isSelectableCards && <MessageBoxSelectableCards selectableCards={messageStore.allSelectableCards} selected={messageStore.allSelectedCards} />}

        {!scene_end && isSelectableCards && (
          <ButtonGroup>
            <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={button_label_skip} variant="blue" />
            {isVote ? (
              <Button onClick={() => handleVote(selectedCards, title)} disabled={selectedCards.length === 0} buttonText={button_label_vote} variant="purple" />
            ) : (
              <Button onClick={() => handleCardInteraction(selectedCards, title)} disabled={disabledCards} buttonText={button_label_done} variant="green" />
            )}
          </ButtonGroup>
        )}

        {isSelectableMarks && <MessageBoxSelectableMarks selectableMarks={messageStore.allSelectableMarks} selected={messageStore.allSelectedMarks} />}

        {!scene_end && isSelectableMarks && (
          <ButtonGroup>
            <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={button_label_skip} variant="blue" />
            {isVote ? (
              <Button onClick={() => handleVote(selectedMarks, title)} disabled={selectedMarks.length === 0} buttonText={button_label_vote} variant="purple" />
            ) : (
              <Button onClick={() => handleMarkInteraction(selectedMarks, title)} disabled={disabledMarks} buttonText={button_label_done} variant="green" />
            )}
          </ButtonGroup>
        )}

        {isAnswerOptions && <MessageBoxAnswer answer_options={answer_options} />}

        {!scene_end && isAnswerOptions && (
          <ButtonGroup>
            <Button onClick={() => handleSkip(title)} disabled={obligatory} buttonText={button_label_skip} variant="blue" />
            <Button onClick={() => handleAnswerInteraction(selectedAnswer, title)} disabled={selectedAnswer.length === 0} buttonText={button_label_done} variant="green" />
          </ButtonGroup>
        )}

        {isVoteResult && <MessageBoxVoteResult votes={votes} />}
      </Message>

      {scene_end && (
        <ButtonGroup>
          <Button onClick={() => handleFinish(title)} buttonText={button_label_finish} variant="purple" />
        </ButtonGroup>
      )}
    </StyledMessageBox>
  )
})
