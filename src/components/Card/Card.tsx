import { observer } from 'mobx-react-lite'
import { selectedDeckStore, deckStore } from 'store'
import { StyledCard, CardImage, CardName } from './Card.styles'
import { CardProps } from './Card.types'
import { useCallback, useMemo } from 'react'

export const Card = observer(({ id, card_name, display_name }: CardProps) => {
  const isSelected = selectedDeckStore.selectedCards.some(
    (card) => card.id === id
  )

  const handleCardClick = useCallback(() => {
    // Toggle the card selection
    selectedDeckStore.toggleCardSelection({
      id,
      card_name,
      display_name,
      rules: '',
      expansion: '',
      team: '',
      wake_up_time: '',
      order: 0,
    })

    // Update the play deck with selected cards
    selectedDeckStore.updatePlayDeckWithSelectedCards(
      selectedDeckStore.selectedCards
    )

    // Show the detailed card info when clicked
    deckStore.toggleInfo(id, 'card')
  }, [id, card_name, display_name])

  const imageSrc = useMemo(
    () => require(`../../assets/cards/${card_name}.png`),
    [card_name]
  )

  return (
    <StyledCard isSelected={isSelected} onClick={handleCardClick}>
      <CardImage src={imageSrc} alt={display_name} isSelected={isSelected} />
      <CardName isSelected={isSelected}>{display_name}</CardName>
    </StyledCard>
  )
})
