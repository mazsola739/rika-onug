import { observer } from 'mobx-react-lite'
import { StyledGameCard, GameCardImage, TokenImage } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { useState } from 'react'

export const GameCard = observer(
  ({ card_name, display_name, player_number, isCenter }: GameCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
      setIsFlipped(!isFlipped)
    }

    return (
      <StyledGameCard onClick={handleClick}>
        <GameCardImage
          src={
            isFlipped
              ? require(`../../assets/cards/${card_name}.png`)
              : require('../../assets/backgrounds/card_back.png')
          }
          alt={display_name}
        />
        {!isCenter && (
          <TokenImage
            src={require(`../../assets/players/player_${player_number}.png`)}
            alt={`player_${player_number}`}
          />
        )}
      </StyledGameCard>
    )
  }
)
