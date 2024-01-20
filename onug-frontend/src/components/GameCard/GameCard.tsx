import { observer } from 'mobx-react-lite'
import { StyledGameCard, TokenImage, Tokens } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { gameTableStore } from 'store'

export const GameCard: React.FC<GameCardProps> = observer(
  ({ player, isCenter }) => {
    const { hasMarks } = gameTableStore

    return (
      <StyledGameCard backgroundImage={'/assets/cards/card_background.png'}>
        {!isCenter && (
          <Tokens>
            {/* Player number */}
            <TokenImage
              src={`/assets/players/player_${player.player_number}.png`}
              alt={`player_${player.player_number}`}
            />
            {/* Shield */}
            {player.player_card.shield && (
              <TokenImage
                src={`/assets/tokens/shield.png`}
                alt={`player_${player.player_number}`}
              />
            )}
            {/* Artifact */}
            {player.player_card.artifact.length > 0 && (
              <TokenImage
                src={`/assets/tokens/artifact_back.png`}
                alt={`player_${player.player_number}`}
              />
            )}
            {/* Mark */}
            {hasMarks && (
              <TokenImage
                src={`/assets/tokens/mark_back.png`}
                alt={`player_${player.player_number}`}
              />
            )}
          </Tokens>
        )}
      </StyledGameCard>
    )
  }
)
