import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CardBack, StyledGameCard, Tokens } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { deckStore, gameTableStore, interactionStore } from 'store'
import { Icon, Token } from 'components'

export const GameCard: React.FC<GameCardProps> = observer(
  ({ position, id, isCenter, ready, werewolf, selectable, mason }) => {
    const [isSelected, setIsSelected] = useState(false)
    const { hasMarks } = gameTableStore
    const card = id === 0 ? '' : deckStore.getCardById(id)

    const playerTokenName = ready ? `selected_${position}` : position
    const imgSrc =
      card && card.id !== 0
        ? `/assets/cards/${card.card_name}.png`
        : '/assets/backgrounds/card_back.png'

    const clickHandler = () => {
      if (selectable) {
        setIsSelected(!isSelected)

        if (!isSelected) {
          interactionStore.setSelectedCards([
            ...interactionStore.selectedCards,
            position,
          ])
        } else {
          const updatedSelectedCards = interactionStore.selectedCards.filter(
            (cardPos) => cardPos !== position
          )
          interactionStore.setSelectedCards(updatedSelectedCards)
        }
      }
    }

    return (
      <StyledGameCard>
        <CardBack
          backgroundImage={imgSrc}
          selectable={selectable}
          onClick={clickHandler}
          isSelected={isSelected}
        />
        <Tokens>
          {!isCenter && <Token tokenName={playerTokenName} size={35} />}
          {!isCenter && hasMarks && <Token tokenName={'mark_back'} size={35} />}
          {!isCenter && werewolf && <Icon iconName="werewolf" size={33} />}
          {!isCenter && mason && <Icon iconName="mason" size={33} />}
        </Tokens>
      </StyledGameCard>
    )
  }
)
