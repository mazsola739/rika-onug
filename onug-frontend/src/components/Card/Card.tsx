import { CardImage } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledCard } from './Card.styles'
import { CardProps } from './Card.types'

export const Card: React.FC<CardProps> = observer(({ image, isSelectable, werewolf, dreamwolf, masons, size, onClick }) => {
  const props = { sizeW :size, isSelectable, werewolf, dreamwolf, masons }
  return (
    <StyledCard {...props} onClick={onClick}>
      <CardImage image={image} size={size} />
    </StyledCard>
  )
})
