import { observer } from 'mobx-react-lite'
import { selectedDeckStore, roomStore, wsStore } from 'store'
import { StyledCard, CardImage, CardName } from './Card.styles'
import { CardProps } from './Card.types'
import { useCallback, useMemo } from 'react'
import { UPDATE_ROOM } from 'constant'

export const Card: React.FC<CardProps> = observer(({ card }) => {
  const { id, card_name, display_name, rules, expansion, team, wake_up_time } =
    card

  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')

  const { sendJsonMessage } = wsStore.getWsCommunicationsBridge()
  const isSelected = selectedDeckStore.selectedCards.some(
    (selectedCard) => selectedCard.id === id
  )

  const testId = `${display_name.replace(/ /g, '-')}--${
    isSelected ? 'selected' : 'not-selected'
  }`

  const handleCardClick = useCallback(() => {
    /*   selectedDeckStore.toggleCardSelectionStatus(id)
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
    ) */

    sendJsonMessage?.({
      type: UPDATE_ROOM,
      card_id: id,
      room_id,
      token,
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

  const imageSrc = useMemo(() => `/assets/cards/${card_name}.png`, [card_name])

  return (
    <StyledCard
      isSelected={isSelected}
      onClick={handleCardClick}
      data-testid={testId}
    >
      <CardImage src={imageSrc} alt={display_name} isSelected={isSelected} />
      <CardName isSelected={isSelected}>{display_name}</CardName>
    </StyledCard>
  )
})
