import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { deckStore } from 'store'
import { RoleCardName, RoleImage, StyledRoleCard, WakeUp } from './RoleCard.styles'
import { RoleCardProps } from './RoleCard.types'

export const RoleCard: React.FC<RoleCardProps> = observer(({ card }) => {
  const { id, card_name, display_name, wake_up_time } = card
  const { handleSelectAndDeselect } = useClickHandler()

  const isSelected = deckStore.selectedCards.some(selectedCard => selectedCard.id === id)
  const imageSrc = useMemo(() => `/assets/cards/${card_name}.webp`, [card_name])
  const wakeUp = wake_up_time === "day" ? '☀️' : '🌙'

  return (
    <StyledRoleCard isSelected={isSelected} onClick={() => handleSelectAndDeselect(id)}>
      <RoleImage src={imageSrc} alt={display_name} isSelected={isSelected} />
      <WakeUp isSelected={isSelected}>{wakeUp}</WakeUp>
      <RoleCardName isSelected={isSelected}>{display_name}</RoleCardName>
    </StyledRoleCard>
  )
})
