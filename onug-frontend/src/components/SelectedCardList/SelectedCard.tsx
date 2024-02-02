import { UPDATE_ROOM } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { selectedDeckStore, wsStore, roomStore } from 'store'
import { SelectedCardProps } from './SelectedCardList.types'
import { CardImage } from 'components'

export const SelectedCard: React.FC<SelectedCardProps> = observer(
  ({ card }) => {
    const {
      id,
      card_name,
      display_name,
      rules,
      expansion,
      team,
      wake_up_time,
    } = card
    const isSelected = selectedDeckStore.selectedCards.some(
      (selectedCard) => selectedCard.id === id
    )
    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')
    const action = isSelected ? 'CARD_DESELECT' : 'CARD_SELECT'
    const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

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
      })

      selectedDeckStore.updatePlayDeckWithSelectedCards(
        selectedDeckStore.selectedCards
      )

      sendJsonMessage?.({
        type: UPDATE_ROOM,
        card_id: id,
        room_id,
        token,
        action,
      })

      roomStore.toggleInfo(id, 'card')
    }, [
      id,
      card_name,
      display_name,
      rules,
      expansion,
      team,
      wake_up_time,
      room_id,
      sendJsonMessage,
    ])

    return (
      <CardImage
        image={card.card_name}
        key={card.id}
        onClick={handleDeselect}
        size={45}
      />
    )
  }
)
