import { observer } from 'mobx-react-lite'
import { StyledGameCard, TokenImage, Tokens } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { gameTableStore } from 'store'

export const GameCard = observer(({ player, isCenter }: GameCardProps) => {
  const { hasMarks } = gameTableStore

  return (
    <StyledGameCard
      backgroundImage={require('../../assets/cards/card_background.png')}
    >
      {!isCenter && (
        <Tokens>
          {/* Player number */}
          <TokenImage
            src={require(
              `../../assets/players/player_${player.player_number}.png`
            )}
            alt={`player_${player.player_number}`}
          />
          {/* Shield */}
          {player.player_card.shield && (
            <TokenImage
              src={require(`../../assets/tokens/shield.png`)}
              alt={`player_${player.player_number}`}
            />
          )}
          {/* Artifact */}
          {player.player_card.artifact.length > 0 && (
            <TokenImage
              src={require(`../../assets/tokens/artifact_back.png`)}
              alt={`player_${player.player_number}`}
            />
          )}
          {/* Mark */}
          {hasMarks && (
            <TokenImage
              src={require(`../../assets/tokens/mark_back.png`)}
              alt={`player_${player.player_number}`}
            />
          )}
        </Tokens>
      )}
    </StyledGameCard>
  )
})
