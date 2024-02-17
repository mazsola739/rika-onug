import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { CardBack, StyledBoardGameCard, Tokens } from './BoardGameCard.styles'
import { BoardGameCardProps } from './BoardGameCard.types'
import { deckStore, gameTableStore, interactionStore } from 'store'
import { Icon, Token } from 'components'
import { useClickHandler } from 'hooks'

export const BoardGameCard: React.FC<BoardGameCardProps> = observer(
  ({
    position,
    id,
    spy,
    isCenter,
    ready,
    selectable,
    aliens,
    artifact,
    assassin,
    awesome,
    babyalien,
    bat,
    blob,
    bulb,
    clarity,
    claw,
    cow,
    diseased,
    dreamwolf,
    dress,
    drunk,
    empath,
    evil,
    family,
    fang,
    fear,
    friend,
    jest,
    like,
    lovers,
    masons,
    mad,
    mortician,
    nice,
    pretty,
    seer,
    select,
    shield,
    smell,
    sus,
    swap,
    tanner,
    tap,
    target,
    traitor,
    trophy,
    ufo,
    vampires,
    villains,
    werewolves,
  }) => {
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
      <StyledBoardGameCard>
        <Tokens>
          {!isCenter && <Token tokenName={playerTokenName} size={35} />}
        </Tokens>
        <CardBack
          backgroundImage={imgSrc}
          selectable={selectable}
          onClick={() => clickHandler(isCenter ? 'center' : 'player')}
          isSelected={isSelected}
        />
        <Tokens>
          {!isCenter && shield && <Token tokenName="shield" size={35} />}
          {isCenter && spy && <Icon iconName="spy" size={33} />}
          {!isCenter && artifact && <Icon iconName="artifact" size={33} />}
          {!isCenter && aliens && <Icon iconName="alien" size={33} />}
          {!isCenter && assassin && <Icon iconName="assassin" size={33} />}
          {!isCenter && awesome && <Icon iconName="awesome" size={33} />}
          {!isCenter && babyalien && <Icon iconName="babyalien" size={33} />}
          {!isCenter && bat && <Icon iconName="bat" size={33} />}
          {!isCenter && blob && <Icon iconName="blob" size={33} />}
          {!isCenter && bulb && <Icon iconName="bulb" size={33} />}
          {!isCenter && clarity && <Icon iconName="clarity" size={33} />}
          {!isCenter && claw && <Icon iconName="claw" size={33} />}
          {!isCenter && cow && <Icon iconName="cow" size={33} />}
          {!isCenter && diseased && <Icon iconName="diseased" size={33} />}
          {!isCenter && dreamwolf && <Icon iconName="dreamwolf" size={33} />}
          {!isCenter && dress && <Icon iconName="dress" size={33} />}
          {!isCenter && drunk && <Icon iconName="drunk" size={33} />}
          {!isCenter && empath && <Icon iconName="empath" size={33} />}
          {!isCenter && evil && <Icon iconName="evil" size={33} />}
          {!isCenter && family && <Icon iconName="family" size={33} />}
          {!isCenter && fang && <Icon iconName="fang" size={33} />}
          {!isCenter && fear && <Icon iconName="fear" size={33} />}
          {!isCenter && friend && <Icon iconName="friend" size={33} />}
          {!isCenter && jest && <Icon iconName="jest" size={33} />}
          {!isCenter && like && <Icon iconName="like" size={33} />}
          {!isCenter && lovers && <Icon iconName="lover" size={33} />}
          {!isCenter && masons && <Icon iconName="mason" size={33} />}
          {!isCenter && mad && <Icon iconName="mad" size={33} />}
          {!isCenter && mortician && <Icon iconName="mortician" size={33} />}
          {!isCenter && nice && <Icon iconName="nice" size={33} />}
          {!isCenter && pretty && <Icon iconName="pretty" size={33} />}
          {!isCenter && seer && <Icon iconName="seer" size={33} />}
          {!isCenter && select && <Icon iconName="select" size={33} />}
          {!isCenter && smell && <Icon iconName="smell" size={33} />}
          {!isCenter && sus && <Icon iconName="sus" size={33} />}
          {!isCenter && swap && <Icon iconName="swap" size={33} />}
          {!isCenter && tanner && <Icon iconName="tanner" size={33} />}
          {!isCenter && tap && <Icon iconName="tap" size={33} />}
          {!isCenter && target && <Icon iconName="target" size={33} />}
          {!isCenter && traitor && <Icon iconName="traitor" size={33} />}
          {!isCenter && trophy && <Icon iconName="trophy" size={33} />}
          {!isCenter && ufo && <Icon iconName="ufo" size={33} />}
          {!isCenter && vampires && <Icon iconName="vampire" size={33} />}
          {!isCenter && villains && <Icon iconName="villain" size={33} />}
          {!isCenter && werewolves && <Icon iconName="werewolf" size={33} />}
        </Tokens>
        {!isCenter && hasMarks && <Token tokenName="mark_back" size={75} />}
      </StyledBoardGameCard>
    )
  }
)
