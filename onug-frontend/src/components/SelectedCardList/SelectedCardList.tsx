import { SelectedCard } from 'components'
import { observer } from 'mobx-react-lite'
import { selectedDeckStore } from 'store'
import { StyledSelectedCardList } from './SelectedCardList.styles'

export const SelectedCardList = observer(() => {
  const { selectedCards } = selectedDeckStore

  return (
    <StyledSelectedCardList>
      {selectedCards.map((card) => (
        <SelectedCard key={card.id} card={card} />
      ))}
    </StyledSelectedCardList>
  )
})
