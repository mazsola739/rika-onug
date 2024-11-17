import { Card } from 'components/Card/Card'
import { observer } from 'mobx-react-lite'
import { selectionStore } from 'store'
import { formatPositionSimply } from 'utils'
import { StyledAccusedCards, AccusedCard, CardPosition } from './SuspicionCards.styles'

export const AccusedCards: React.FC = observer(() => {
  const onCardClick = (position: string) => {
    selectionStore.toggleCardSelection(position)
  }
  const { selectedCards } = selectionStore

  return (
    <StyledAccusedCards>
      {selectedCards.map((card, index) => (
        <AccusedCard key={index}>
          <CardPosition>{formatPositionSimply(card)}</CardPosition>
          <Card image="card_background" onClick={() => onCardClick(card)} size={40} />
        </AccusedCard>
      ))}
    </StyledAccusedCards>
  )
})
