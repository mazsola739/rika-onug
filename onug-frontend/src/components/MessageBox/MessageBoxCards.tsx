import { CardImage } from 'components'
import { observer } from 'mobx-react-lite'
import { selectionStore } from 'store'
import { StyledMessageBoxCards, MessageBoxItem, ItemPosition } from './MessageBox.styles'
import { MessageBoxProps } from './MessageBox.types'

export const MessageBoxCards: React.FC<MessageBoxProps> = observer(({ cards }) => {
  const onCardClick = (position: string) => {
    selectionStore.toggleCardSelection(position)
  }

  return (
    <StyledMessageBoxCards>
      {cards.map((card, index) => (
        <MessageBoxItem key={index}>
          <ItemPosition>{card.name}</ItemPosition>
          <CardImage image="card_background" onClick={() => onCardClick(card.position)} size={40} />
        </MessageBoxItem>
      ))}
    </StyledMessageBoxCards>
  )
})
