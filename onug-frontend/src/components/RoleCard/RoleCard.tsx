import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { deckStore } from 'store'
import { RoleCardName, RoleImage, StyledRoleCard } from './RoleCard.styles'
import { RoleCardProps } from './RoleCard.types'

export const RoleCard: React.FC<RoleCardProps> = observer(({ card }) => {
  const { id, card_name, display_name } = card
  const { handleSelectAndDeselect } = useClickHandler()

  const isSelected = deckStore.selectedCards.some(selectedCard => selectedCard.id === id)
  const imageSrc = useMemo(() => `/assets/cards/${card_name}.webp`, [card_name])

  return (
    <StyledRoleCard isSelected={isSelected} onClick={() => handleSelectAndDeselect(id)}>
      <RoleImage src={imageSrc} alt={display_name} isSelected={isSelected} />
      <RoleCardName isSelected={isSelected}>{display_name}</RoleCardName>
    </StyledRoleCard>
  )
})
