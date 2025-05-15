import { Narration } from 'components'
import { observer } from 'mobx-react-lite'
import { messageStore, propStore } from 'store'
import { StyledMessageBox, Message, MessageText } from './MessageBox.styles'
import { MessageBoxLook, MessageBoxSelectableCards, MessageBoxSelectableMarks, MessageBoxAnswer, MessageBoxVoteResult } from './MessageBoxComponents'
import { SelectableCardsButtons, SelectableMarksButtons, AnswerButtons, SceneEndButtons } from './MessageBoxButtons'

//TODO show own card own mark ect... in box? no buttons here?

export const MessageBox: React.ComponentType = observer(() => {
  const { narrationImage, narration, privateMessage, isSelectableCards, isSelectableMarks, isPlayerIdentification, isAnswerOptions, isVoteResult } = messageStore
  const { scene_end } = propStore

  return (
    <StyledMessageBox>
      <Narration image={narrationImage} text={narration} />
      <Message>
        <MessageText>{privateMessage}</MessageText>
        {isPlayerIdentification && <MessageBoxLook />}
        {isVoteResult && <MessageBoxVoteResult />}
        {isSelectableCards && <MessageBoxSelectableCards />}
        {!scene_end && isSelectableCards && <SelectableCardsButtons />}
        {isSelectableMarks && <MessageBoxSelectableMarks />}
        {!scene_end && isSelectableMarks && <SelectableMarksButtons />}
        {isAnswerOptions && <MessageBoxAnswer />}
        {!scene_end && isAnswerOptions && <AnswerButtons />}
      </Message>
      {scene_end && <SceneEndButtons />}
    </StyledMessageBox>
  )
})
