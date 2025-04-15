import { Narration } from 'components'
import { observer } from 'mobx-react-lite'
import { messageStore, propStore } from 'store'
import { StyledMessageBox, Message, MessageText } from './MessageBox.styles'
import { RenderLook, RenderSelectableCards, RenderSelectableMarks, RenderAnswer, RenderVoteResult } from './RenderMessageBoxComponents'
import { SelectableCardsButtons, SelectableMarksButtons, AnswerButtons, SceneEndButtons } from './RenderMessageBoxButtons'

export const MessageBox: React.FC = observer(() => {
  const { narrationImage, narration, privateMessage, isSelectableCards, isSelectableMarks, isPlayerIdentification, isAnswerOptions, isVoteResult } = messageStore
  const { scene_end } = propStore

  return (
    <StyledMessageBox>
      <Narration image={narrationImage} text={narration} />
      <Message>
        <MessageText>{privateMessage}</MessageText>
        {isPlayerIdentification && <RenderLook />}
        {isSelectableCards && <RenderSelectableCards />}
        {!scene_end && isSelectableCards && <SelectableCardsButtons />}
        {isSelectableMarks && <RenderSelectableMarks />}
        {!scene_end && isSelectableMarks && <SelectableMarksButtons />}
        {isAnswerOptions && <RenderAnswer />}
        {!scene_end && isAnswerOptions && <AnswerButtons />}
        {isVoteResult && <RenderVoteResult />}
      </Message>
      {scene_end && <SceneEndButtons />}
    </StyledMessageBox>
  )
})
