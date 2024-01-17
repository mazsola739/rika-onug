import { roomStore, selectedDeckStore } from 'store'
import { StyledSelectedCard } from './SelectedCard.styles'
import { SelectedCardProps } from './SelectedCard.types'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { UPDATE_SELECT } from 'constant'

export const SelectedCard = observer(({ card }: SelectedCardProps) => {
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

  const sendJsonMessage = roomStore.getSendJsonMessage()

  const room_id = sessionStorage.getItem('room_id')

  const handleDeselect = useCallback(() => {
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

  return (
    <StyledSelectedCard
      src={require(`../../assets/cards/${card.card_name}.png`)}
      alt={card.display_name}
      key={card.id}
      onClick={handleDeselect}
    />
  )
})
