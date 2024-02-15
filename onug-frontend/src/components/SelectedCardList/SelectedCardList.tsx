import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { StyledSelectedCardList } from './SelectedCardList.styles'
import { SelectedCard } from './SelectedCard'

export const SelectedCardList: React.FC = observer(() => {
  const { selectedCards } = deckStore

  return (
    <StyledSelectedCardList>
      {selectedCards.map((card, index) => (
        <SelectedCard key={index} card={card} />
      ))}
    </StyledSelectedCardList>
  )
})
