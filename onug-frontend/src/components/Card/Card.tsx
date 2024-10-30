import { CardImage, GlowingBorder } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledCard } from './Card.styles'
import { CardProps } from './Card.types'

export const Card: React.FC<CardProps> = observer(
  ({ image, isSelectable, size }) => {
    const sizeH = Math.round(size * 1.37367)

    const glowColor = isSelectable ? "#28a745" : "transparent"

    return (
      <StyledCard sizeW={size} sizeH={sizeH}>
          <GlowingBorder glowColor={glowColor} sizeW={size} sizeH={sizeH}>
            <CardImage image={image} size={size} />
          </GlowingBorder>
      </StyledCard>
    )
  }
)
