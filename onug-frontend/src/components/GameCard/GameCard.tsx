import { observer } from 'mobx-react-lite'
import { StyledGameCard, TokenImage, Tokens } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { useState } from 'react'

export const GameCard = observer(
  ({ card_name, player_number, isCenter }: GameCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
      setIsFlipped(!isFlipped)
    }

    return (
      <StyledGameCard
        backgroundImage={
          isFlipped
            ? require(`../../assets/cards/${card_name}.png`)
            : require('../../assets/cards/card_background.png')
        }
        onClick={handleClick}
      >
        {!isCenter && (
          <Tokens>
            {/* Player number */}
            <TokenImage
              src={require(`../../assets/players/player_${player_number}.png`)}
              alt={`player_${player_number}`}
            />
            {/* Shield */}
            <TokenImage
              src={require(`../../assets/tokens/shield.png`)}
              alt={`player_${player_number}`}
            />
            {/* Artifact */}
            <TokenImage
              src={require(`../../assets/tokens/artifact_back.png`)}
              alt={`player_${player_number}`}
            />
            {/* Mark */}
            <TokenImage
              src={require(`../../assets/tokens/mark_back.png`)}
              alt={`player_${player_number}`}
            />
          </Tokens>
        )}
      </StyledGameCard>
    )
  }
)
