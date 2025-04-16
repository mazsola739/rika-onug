import { observer } from 'mobx-react-lite'
import { StyledCardImage } from './CardImage.styles'
import { CardImageProps } from './CardImage.types'

export const CardImage: React.ComponentType<CardImageProps> = observer(({ image, onClick, size }) => <StyledCardImage onClick={onClick} src={`/assets/playingcards/${image}.webp`} alt={image} size={size} />)
