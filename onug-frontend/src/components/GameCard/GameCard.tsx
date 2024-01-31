import React from 'react'
import { observer } from 'mobx-react-lite'
import { CardBack, StyledGameCard, TokenImage, Tokens } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { gameTableStore } from 'store'

export const GameCard: React.FC<GameCardProps> = observer(
  ({ player_number, isCenter, ready }) => {
    const { hasMarks } = gameTableStore

    return (
      <StyledGameCard>
        <CardBack backgroundImage={'/assets/cards/card_background.png'} />
        <Tokens>
          {!isCenter && hasMarks && (
            <TokenImage
              src={`/assets/tokens/mark_back.png`}
              alt={`player_${player_number}`}
            />
          )}
          {!isCenter && (
            <TokenImage
              src={
                ready
                  ? `/assets/players/selected_player_${player_number}.png`
                  : `/assets/players/player_${player_number}.png`
              }
              alt={`player_${player_number}`}
            />
          )}
        </Tokens>
      </StyledGameCard>
    )
  }
)
