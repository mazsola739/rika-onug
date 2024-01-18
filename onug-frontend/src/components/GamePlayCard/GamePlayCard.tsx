import { observer } from 'mobx-react-lite'
import { StyledGamePlayCard } from './GamePlayCard.styles'
import { GamePlayCardProps } from './GamePlayCard.types'

export const GamePlayCard: React.FC<GamePlayCardProps> = observer(
  ({ image }) => {
    return (
      <StyledGamePlayCard
        src={require(`../../assets/cards/${image}.png`)}
        alt={image}
      />
    )
  }
)
