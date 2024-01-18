import { observer } from 'mobx-react-lite'
import { selectedDeckStore, roomStore, wsStore } from 'store'
import { StyledCard, CardImage, CardName } from './Card.styles'
import { CardProps } from './Card.types'
import { useCallback, useMemo } from 'react'
import { UPDATE_SELECT } from 'constant'

export const Card = observer(({ card }: CardProps) => {
  const {
    id,
    card_name,
    display_name,
    rules,
    expansion,
    team,
    wake_up_time,
    order,
  } = card
  const isSelected = selectedDeckStore.selectedCards.some(
    (selectedCard) => selectedCard.id === id
  )

  const sendJsonMessage = wsStore.getSendJsonMessage()
  const room_id = sessionStorage.getItem('room_id')

  const handleCardClick = useCallback(() => {
    selectedDeckStore.toggleCardSelectionStatus(id)
    selectedDeckStore.toggleCardSelection({
      id,
      card_name,
      display_name,
      rules,
      expansion,
      team,
      wake_up_time,
      order,
    })

    selectedDeckStore.updatePlayDeckWithSelectedCards(
      selectedDeckStore.selectedCards
    )

    if (sendJsonMessage) {
      const token = sessionStorage.getItem('token')
      const action = isSelected ? 'CARD_DESELECT' : 'CARD_SELECT'
      sendJsonMessage({
        type: UPDATE_SELECT,
        card_id: id,
        room_id,
        token,
        action,
      })
    }

    roomStore.toggleInfo(id, 'card')
  }, [
    id,
    card_name,
    display_name,
    rules,
    expansion,
    team,
    wake_up_time,
    order,
    room_id,
    sendJsonMessage,
  ])

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
