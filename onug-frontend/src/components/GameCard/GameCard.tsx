import React from 'react'
import { observer } from 'mobx-react-lite'
import { CardBack, StyledGameCard, Tokens } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { deckStore, gameTableStore } from 'store'
import { Token } from 'components'

export const GameCard: React.FC<GameCardProps> = observer(
  ({ position, id, isCenter, ready }) => {
    const { hasMarks } = gameTableStore
    const card = id === 0 ? '' : deckStore.getCardById(id)

    console.log(card)

    const playerTokenName = ready ? `selected_${position}` : position

    return (
      <StyledGameCard>
        <CardBack backgroundImage={'/assets/backgrounds/card_back.png'} />
        <Tokens>
          {!isCenter && <Token tokenName={playerTokenName} size={35} />}
          {!isCenter && hasMarks && <Token tokenName={'mark_back'} size={35} />}
        </Tokens>
      </StyledGameCard>
    )
  }
)
