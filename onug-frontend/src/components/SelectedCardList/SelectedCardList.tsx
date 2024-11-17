import { observer } from 'mobx-react-lite'
import { deckStore } from 'store'
import { SelectedCard } from './SelectedCard'
import { StyledSelectedCardList } from './SelectedCardList.styles'
import { Title } from 'components/Title/Title'

export const SelectedCardList: React.FC = observer(() => {
  const { selectedCards } = deckStore

  return (
    <StyledSelectedCardList>
      <Title title={'SELECTED CARDS'} />
      {selectedCards.map((card, index) => (
        <SelectedCard key={index} card={card} />
      ))}
    </StyledSelectedCardList>
  )
})
