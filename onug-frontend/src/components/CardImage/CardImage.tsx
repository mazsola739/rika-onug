import { observer } from 'mobx-react-lite'
import { StyledCardImage } from './CardImage.styles'
import { CardImageProps } from './CardImage.types'

export const CardImage: React.FC<CardImageProps> = observer(
  ({ image, onClick, size }) => <StyledCardImage onClick={onClick} src={`/assets/cards/${image}.png`} alt={image} size={size} />
)
