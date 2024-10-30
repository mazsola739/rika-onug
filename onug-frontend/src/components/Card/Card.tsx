import { CardImage, GlowingBorder } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledCard } from './Card.styles'
import { CardProps } from './Card.types'

export const Card: React.FC<CardProps> = observer(
  ({ image, isSelectable, size }) => {


    return (
      <StyledCard sizeW={size}>
          <CardImage image={image} size={size} />
      </StyledCard>
    )
  }
)
