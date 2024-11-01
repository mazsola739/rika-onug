import { CardImage } from 'components'
import { observer } from 'mobx-react-lite'
import { StyledCard } from './Card.styles'
import { CardProps } from './Card.types'

export const Card: React.FC<CardProps> = observer(
  ({ image, isSelectable, werewolf, dreamwolf, size, onClick, position }) => {

    console.log(`${position}: `, isSelectable)
    return (
      <StyledCard sizeW={size} isSelectable={isSelectable} werewolf={werewolf} dreamwolf={dreamwolf} onClick={onClick}>
          <CardImage image={image} size={size} />
      </StyledCard>
    )
  }
)

/*height: ${({ sizeH }) => sizeH}px;
  const sizeH = Math.round(size * 1.37367)
  const glowColor = isSelectable ? "#28a745" : "transparent" */
