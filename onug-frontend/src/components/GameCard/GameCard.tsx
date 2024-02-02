import React from 'react'
import { observer } from 'mobx-react-lite'
import { CardBack, StyledGameCard, Tokens } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { gameTableStore } from 'store'
import { Token } from 'components'

export const GameCard: React.FC<GameCardProps> = observer(
  ({ player_number, isCenter, ready }) => {
    const { hasMarks } = gameTableStore

    const playerTokenName = ready
      ? `selected_player_${player_number}`
      : `player_${player_number}`

    return (
      <StyledGameCard>
        <CardBack backgroundImage={'/assets/backgrounds/card_back.png'} />
        <Tokens>
          {!isCenter && hasMarks && <Token tokenName={'mark_back'} size={35} />}
          {!isCenter && <Token tokenName={playerTokenName} size={35} />}
        </Tokens>
      </StyledGameCard>
    )
  }
)
