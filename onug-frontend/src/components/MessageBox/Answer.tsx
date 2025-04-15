import { Button } from 'components'
import { observer } from 'mobx-react-lite'
import { selectionStore } from 'store'
import { StyledAnswer } from './MessageBox.styles'
import { AnswersProps } from './MessageBox.types'

export const Answer: React.FC<AnswersProps> = observer(({ answer_options }) => {
  const onAnswerClick = (answer: string) => {
    selectionStore.toggleAnswerSelection(answer)
  }

  return (
    <StyledAnswer>
      {answer_options.map((answer_option, index) => {
        const isSelected = answer_option === selectionStore.selectedAnswer
        return <Button key={index} onClick={() => onAnswerClick(answer_option)} size={60} variant={isSelected ? 'magenta' : 'orange'} buttonText={answer_option} />
      })}
    </StyledAnswer>
  )
})
