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
    const playerTokenName = position.replace(/^player_/, '')
    const imgSrc =
      card && card.id !== 0
        ? `/assets/playingcards/${card.card_name}.png`
        : '/assets/playingcards/card_background.png'

    return (
      <StyledDealtCard>
        <CardBack backgroundImage={imgSrc} />
        <Tokens>
          {!isCenter && <Token tokenName={playerTokenName} size={35} />}
          {!isCenter && hasMarks && <Token tokenName="mark_of_clarity" size={35} />}
        </Tokens>
      </StyledDealtCard>
    )
  }
)
