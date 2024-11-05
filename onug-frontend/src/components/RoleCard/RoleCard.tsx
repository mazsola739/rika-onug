import { observer } from 'mobx-react-lite'
import { RoleCardName, RoleImage, StyledRoleCard } from './RoleCard.styles'
import { RoleCardProps } from './RoleCard.types'
import { useRoleCard } from './useRoleCard'

export const RoleCard: React.FC<RoleCardProps> = observer(({ card }) => {
  const { id, card_name, display_name } = card
  const {isSelected, handleCardClick, imageSrc} = useRoleCard(id, card_name)

  return (
    <StyledRoleCard isSelected={isSelected} onClick={handleCardClick} >
      <RoleImage src={imageSrc} alt={display_name} isSelected={isSelected} />
      <RoleCardName isSelected={isSelected}>{display_name}</RoleCardName>
    </StyledRoleCard>
  )
})
