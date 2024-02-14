import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CardBack, StyledGameCard, Tokens } from './GameCard.styles'
import { GameCardProps } from './GameCard.types'
import { deckStore, gameTableStore, interactionStore } from 'store'
import { Icon, Token } from 'components'
import { useClickHandler } from 'hooks'

export const GameCard: React.FC<GameCardProps> = observer(
  ({ position, id, isCenter, ready, werewolf, selectable, mason, shield }) => {
    const [isSelected, setIsSelected] = useState(false)
    const { hasMarks } = gameTableStore
    const card = id === 0 ? '' : deckStore.getCardById(id)
    const playerTokenName = ready ? `selected_${position}` : position
    const imgSrc =
      card && card.id !== 0
        ? `/assets/cards/${card.card_name}.png`
        : '/assets/backgrounds/card_back.png'

    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')
    const { handleInteraction } = useClickHandler(room_id, token)

    const clickHandler = (cardType: string) => {
      const maxCenterCardSelection = interactionStore.selectableCenterCardLimit
      const maxPlayerCardSelection = interactionStore.selectablePlayerCardLimit

      if (selectable) {
        const isCenterCardType = cardType === 'center'
        const selectedCards = isCenterCardType
          ? interactionStore.selectedCenterCards
          : interactionStore.selectedPlayerCards
        const maxSelectionLimit = isCenterCardType
          ? maxCenterCardSelection
          : maxPlayerCardSelection
        const hasOppositeSelected = isCenterCardType
          ? interactionStore.selectedPlayerCards.length > 0
          : interactionStore.selectedCenterCards.length > 0

        if (isSelected && selectedCards.includes(position)) {
          const updatedSelectedCards = selectedCards.filter(
            (cardPos) => cardPos !== position
          )
          isCenterCardType
            ? interactionStore.setSelectedCenterCards(updatedSelectedCards)
            : interactionStore.setSelectedPlayerCards(updatedSelectedCards)
          interactionStore.setSelectedCards(updatedSelectedCards)
          setIsSelected(false)
        } else if (selectedCards.length < maxSelectionLimit) {
          const updatedSelectedCards = [...selectedCards, position]
          isCenterCardType
            ? interactionStore.setSelectedCenterCards(updatedSelectedCards)
            : interactionStore.setSelectedPlayerCards(updatedSelectedCards)
          interactionStore.setSelectedCards(updatedSelectedCards)
          setIsSelected(true)
        } else if (hasOppositeSelected) {
          return
        }

        interactionStore.selectedCards.length === maxSelectionLimit &&
          handleInteraction(interactionStore.selectedCards)
      }
    }

    return (
      <StyledGameCard>
        <CardBack
          backgroundImage={imgSrc}
          selectable={selectable}
          onClick={() => clickHandler(isCenter ? 'center' : 'player')}
          isSelected={isSelected}
        />
        <Tokens>
          {!isCenter && <Token tokenName={playerTokenName} size={35} />}
          {!isCenter && hasMarks && <Token tokenName={'mark_back'} size={35} />}
          {!isCenter && shield && <Icon iconName="shield" size={33} />}
          {!isCenter && werewolf && <Icon iconName="werewolf" size={33} />}
          {!isCenter && mason && <Icon iconName="mason" size={33} />}
        </Tokens>
      </StyledGameCard>
    )
  }
)
