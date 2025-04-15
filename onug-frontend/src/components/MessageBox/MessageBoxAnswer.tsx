import { Button } from 'components'
import { observer } from 'mobx-react-lite'
import { selectionStore } from 'store'
import { StyledMessageBoxAnswer } from './MessageBox.styles'
import { MessageBoxAnswerProps } from './MessageBox.types'

export const MessageBoxAnswer: React.FC<MessageBoxAnswerProps> = observer(({ answer_options }) => {
  const onAnswerClick = (answer: string) => selectionStore.toggleAnswerSelection(answer)

  return (
    <StyledMessageBoxAnswer>
      {answer_options.map((answer_option, index) => {
        const isSelected = answer_option === selectionStore.selectedAnswer
        return <Button key={index} onClick={() => onAnswerClick(answer_option)} size={60} variant={isSelected ? 'magenta' : 'orange'} buttonText={answer_option} />
      })}
    </StyledMessageBoxAnswer>
  )
})
