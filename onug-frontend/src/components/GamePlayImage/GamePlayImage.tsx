import { observer } from 'mobx-react-lite'
import { StyledGamePlayImage } from './GamePlayImage.styles'
import { GamePlayImageProps } from './GamePlayImage.types'

export const GamePlayImage = observer(({ image }: GamePlayImageProps) => {
  return (
    <StyledGamePlayImage
      src={require(`../../assets/cards/${image}.png`)}
      alt={image}
    />
  )
})
