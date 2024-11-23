import { CardImage } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledCard } from './Card.styles'
import { CardProps } from './Card.types'

export const Card: React.FC<CardProps> = observer(({ image, isSelectable, isSelected, size, onClick }) => {
  const props = { sizeW: size, isSelectable, isSelected }
  return (
    <StyledCard {...props} onClick={onClick}>
      <CardImage image={image} size={size} />
    </StyledCard>
  )
})
