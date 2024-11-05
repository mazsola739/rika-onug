import { CardImage } from 'components'
import { UPDATE_ROOM } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback } from 'react'
import { deckStore, roomStore, wsStore } from 'store'
import { SelectedCardProps } from './SelectedCard.types'

export const SelectedCard: React.FC<SelectedCardProps> = observer(
  ({ card }, index) => {
    const { id } = card
    const isSelected = deckStore.selectedCards.some((selectedCard) => selectedCard.id === id)
    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')
    const action = isSelected ? 'CARD_DESELECT' : 'CARD_SELECT'
    const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

    const handleDeselect = useCallback(() => {
      sendJsonMessage?.({
        type: UPDATE_ROOM,
        card_id: id,
        room_id,
        token,
        action,
      })

      roomStore.toggleInfo(id)
    }, [id, sendJsonMessage])

    return <CardImage image={card.card_name} key={index} onClick={handleDeselect} size={70} />
  }
)
