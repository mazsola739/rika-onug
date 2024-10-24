import { UPDATE_ROOM } from 'constant'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo } from 'react'
import { deckStore, roomStore, wsStore } from 'store'
import { RoleCardName, RoleImage, StyledRoleCard } from './RoleCard.styles'
import { RoleCardProps } from './RoleCard.types'

export const RoleCard: React.FC<RoleCardProps> = observer(({ card }) => {
  const { id, card_name, display_name } = card

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
  const isSelected = deckStore.selectedCards.some((selectedCard) => selectedCard.id === id)

  const testId = `${display_name.replace(/ /g, '-')}--${
    isSelected ? 'selected' : 'not-selected'
  }`

  const handleCardClick = useCallback(() => {
    sendJsonMessage?.({
      type: UPDATE_ROOM,
      card_id: id,
      room_id,
      token,
    })

    roomStore.toggleInfo(id)
  }, [
    card_name,
    display_name,
    room_id,
    sendJsonMessage,
  ])

  const imageSrc = useMemo(() => `/assets/cards/${card_name}.png`, [card_name])

  return (
    <StyledRoleCard isSelected={isSelected} onClick={handleCardClick} data-testid={testId} >
      <RoleImage src={imageSrc} alt={display_name} isSelected={isSelected} />
      <RoleCardName isSelected={isSelected}>{display_name}</RoleCardName>
    </StyledRoleCard>
  )
})
