import { UPDATE_ROOM } from 'constant'
import { useCallback, useMemo } from 'react'
import { deckStore, roomStore, wsStore } from 'store'

export const useRoleCard = (id: number, card_name: string) => {
  const roomId = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()

  const isSelected = deckStore.selectedCards.some(selectedCard => selectedCard.id === id)

  const handleCardClick = useCallback(() => {
    if (sendJsonMessage) {
      sendJsonMessage({
        type: UPDATE_ROOM,
        card_id: id,
        room_id: roomId,
        token
      })
    }
    roomStore.toggleInfo(id)
  }, [id, isSelected, sendJsonMessage])

  const imageSrc = useMemo(() => `/assets/cards/${card_name}.webp`, [card_name])

  return { isSelected, handleCardClick, imageSrc }
}
