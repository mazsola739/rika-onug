import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { SelectedCard } from './SelectedCard'
import { StyledSelectedCardList } from './SelectedCardList.styles'
import { Title } from 'typography'

export const SelectedCardList: React.ComponentType = observer(() => {
  const { selectedCards } = deckStore

  return (
    <StyledSelectedCardList>
      <Title title={'SELECTED CARDS'} />
      {selectedCards.map((card) => (
        <SelectedCard key={card.id} card={card} />
      ))}
    </StyledSelectedCardList>
  )
})
