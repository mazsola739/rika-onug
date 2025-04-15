import { Button } from 'components'
import { observer } from 'mobx-react-lite'
import { selectionStore } from 'store'
import { formatPositionSimply } from 'utils'
import { StyledAnswer } from './MessageBox.styles'
import { VoteProps } from './MessageBox.types'

export const Vote: React.FC<VoteProps> = observer(({ options }) => {
  const onAnswerClick = (answer: string) => {
    selectionStore.toggleAnswerSelection(answer)
  }

  return (
    <StyledAnswer>
      {options.map((option, index) => {
        const isSelected = option === selectionStore.selectedAnswer
        return <Button key={index} onClick={() => onAnswerClick(option)} size={60} variant={isSelected ? 'magenta' : 'orange'} buttonText={formatPositionSimply(option)} />
      })}
    </StyledAnswer>
  )
})
