import { observer } from 'mobx-react-lite'
import { StyledGamePlayCard } from './GamePlayCard.styles'
import { GamePlayCardProps } from './GamePlayCard.types'

export const GamePlayCard = observer(({ image }: GamePlayCardProps) => {
  return (
    <StyledGamePlayCard
      src={require(`../../assets/cards/${image}.png`)}
      alt={image}
    />
  )
})
