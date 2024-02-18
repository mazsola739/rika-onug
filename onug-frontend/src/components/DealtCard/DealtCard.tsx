import React from 'react'
import { observer } from 'mobx-react-lite'
import { CardBack, StyledDealtCard, Tokens } from './DealtCard.styles'
import { DealtCardProps } from './DealtCard.types'
import { deckStore, gameTableStore } from 'store'
import { Token } from 'components'

export const DealtCard: React.FC<DealtCardProps> = observer(
  ({ position, id, isCenter, ready }) => {
    const { hasMarks } = gameTableStore
    const card = id === 0 ? '' : deckStore.getCardById(id)
    const playerTokenName = ready ? `selected_${position}` : position
    const imgSrc =
      card && card.id !== 0
        ? `/assets/cards/${card.card_name}.png`
        : '/assets/backgrounds/card_back.png'

    return (
      <StyledDealtCard>
        <CardBack backgroundImage={imgSrc} />
        <Tokens>
          {!isCenter && <Token tokenName={playerTokenName} size={35} />}
          {!isCenter && hasMarks && <Token tokenName="mark_back" size={35} />}
        </Tokens>
      </StyledDealtCard>
    )
  }
)
