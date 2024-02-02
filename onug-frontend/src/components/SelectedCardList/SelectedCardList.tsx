import { observer } from 'mobx-react-lite'
import { selectedDeckStore } from 'store'
import { StyledSelectedCardList } from './SelectedCardList.styles'
import { SelectedCard } from './SelectedCard'

export const SelectedCardList: React.FC = observer(() => {
  const { selectedCards } = selectedDeckStore

  return (
    <StyledSelectedCardList>
      {selectedCards.map((card) => (
        <SelectedCard key={card.id} card={card} />
      ))}
    </StyledSelectedCardList>
  )
})
