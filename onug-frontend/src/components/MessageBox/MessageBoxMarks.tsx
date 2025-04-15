import { TokenImage } from 'components'
import { observer } from 'mobx-react-lite'
import { selectionStore } from 'store'
import { StyledMessageBoxCards, MessageBoxItem, ItemPosition } from './MessageBox.styles'
import { MessageBoxProps } from './MessageBox.types'

export const MessageBoxMarks: React.FC<MessageBoxProps> = observer(({ marks }) => {
  const onMarkClick = (position: string) => {
    selectionStore.toggleMarkSelection(position)
  }

  return (
    <StyledMessageBoxCards>
      {marks.map((mark, index) => (
        <MessageBoxItem key={index}>
          <ItemPosition>{mark.name}</ItemPosition>
          <TokenImage image="mark_back" onClick={() => onMarkClick(mark.position)} size={35} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})
