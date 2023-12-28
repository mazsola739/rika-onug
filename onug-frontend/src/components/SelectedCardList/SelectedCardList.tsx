import { SelectedCard } from 'components'
import { observer } from 'mobx-react-lite'
import { selectedDeckStore } from 'store'
import { StyledSelectedCardList } from './SelectedCardList.styles'

export const SelectedCardList = observer(() => {
  const { selectedCards } = selectedDeckStore

  return (
    <StyledSelectedCardList>
      {selectedCards.map((card) => (
        <SelectedCard
          key={card.id}
          src={require(`../../assets/cards/${card.card_name}.png`)}
          alt={card.display_name}
          id={card.id}
        />
      ))}
    </StyledSelectedCardList>
  )
})
