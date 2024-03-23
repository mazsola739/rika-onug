import { Token, Icon } from 'components'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { gameTableStore, deckStore, interactionStore } from 'store'
import { StyledBoardCard, Tokens, CardBack, MarkBack } from './BoardCard.styles'
import { BoardCardProps } from './BoardCard.types'

export const BoardCard: React.FC<BoardCardProps> = observer(
  ({
    position,
    id,
    mark,
    spy,
    isCenter,
    selectable_cards,
    selectable_marks,
    shielded_cards,
    shield,
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
    const [isSelectedCard, setIsSelectedCard] = useState(false)
    const [isSelectedMark, setIsSelectedMark] = useState(false)
    const { hasMarks } = gameTableStore
    const card = id === 0 ? '' : deckStore.getCardById(id)
    //TODO VOTED? const playerTokenName = ready ? `selected_${position}` : position
    let cardImageSrc = card && card.id !== 0
      ? `/assets/playingcards/${card.card_name}.png`
      : '/assets/playingcards/card_background.png'

    if (card && card.id !== 0) {
      const { card_name } = card
      let randomDeluxe = ''

      if (['alien', 'robber', 'seer', 'tanner', 'troublemaker', 'vampire', 'werewolf'].includes(card_name)) {
        if (card_name === 'alien') {
          randomDeluxe = Math.random() < 0.5 ? '_male' : '_female'
        } else if (card_name === 'werewolf') {
          randomDeluxe = `_${Math.floor(Math.random() * 3) + 1}`
        } else {
          randomDeluxe = `_${Math.floor(Math.random() * 2) + 1}`
        }
        cardImageSrc = `/assets/playingcards/${card_name}${randomDeluxe}.png`
      }
    }

    const markImageSrc = mark && mark.length !== 0
        ? `/assets/tokens/${mark}.png`
        : '/assets/tokens/mark_back.png'

    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')
    const { handleCardInteraction, handleMarkInteraction } = useClickHandler(room_id, token)

    const cardClickHandler = (cardType: string) => {
      const maxCenterCardSelection = interactionStore.selectableCenterCardLimit
      const maxPlayerCardSelection = interactionStore.selectablePlayerCardLimit
    
      if (selectable_cards) {
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
    
        interactionStore.setSelectedMarks([])
        setIsSelectedMark(false)
    
        if (isSelectedCard && selectedCards.includes(position)) {
          const updatedSelectedCards = selectedCards.filter(
            (cardPos) => cardPos !== position
          )
          isCenterCardType
            ? interactionStore.setSelectedCenterCards(updatedSelectedCards)
            : interactionStore.setSelectedPlayerCards(updatedSelectedCards)
          interactionStore.setSelectedCards(updatedSelectedCards)
          setIsSelectedCard(false)
        } else if (selectedCards.length < maxSelectionLimit) {
          const updatedSelectedCards = [...selectedCards, position]
          isCenterCardType
            ? interactionStore.setSelectedCenterCards(updatedSelectedCards)
            : interactionStore.setSelectedPlayerCards(updatedSelectedCards)
          interactionStore.setSelectedCards(updatedSelectedCards)
          setIsSelectedCard(true)
        } else if (hasOppositeSelected) {
          return
        }
    
        interactionStore.selectedCards.length === maxSelectionLimit && handleCardInteraction(interactionStore.selectedCards)
      }
    }
    
    const markClickHandler = () => {
      const maxMarkSelection = interactionStore.selectableMarkLimit
    
      if (selectable_marks) {
        const selectedMarks = interactionStore.selectedMarks
        interactionStore.setSelectedPlayerCards([])
        interactionStore.setSelectedCards([])
        setIsSelectedCard(false)
    
        if (isSelectedMark && selectedMarks.includes(position)) {
          const updatedSelectedMarks = selectedMarks.filter(
            (markPos) => markPos !== position
          )
          interactionStore.setSelectedMarks(updatedSelectedMarks)
          setIsSelectedMark(false)
        } else if (selectedMarks.length < maxMarkSelection) {
          const updatedSelectedMarks = [...selectedMarks, position]
          interactionStore.setSelectedMarks(updatedSelectedMarks)
          setIsSelectedMark(true)
        }
      }
    
      interactionStore.selectedMarks.length === maxMarkSelection && handleMarkInteraction(interactionStore.selectedMarks)
    }
    
    return (
      <StyledBoardCard>
       {!isCenter && <Tokens>
          {!isCenter && <Token tokenName={position} size={25} />}
          {!isCenter && shield && <Token tokenName="shield" size={25} />}
          {!isCenter && artifact && <Token tokenName="artifact_back" size={25} />}
        </Tokens>}
        <CardBack cardBackgroundImage={cardImageSrc} selectable_cards={selectable_cards} onClick={() => cardClickHandler(isCenter ? 'center' : 'player')} isSelectedCard={isSelectedCard} />
        <Tokens>
          {isCenter && spy && <Icon iconName="spy" size={25} />}
          {!isCenter && shielded_cards && <Icon iconName="shield" size={25} />}
          {/* {!isCenter && artifact && <Icon iconName="artifact" size={25} />} */}
          {!isCenter && aliens && <Icon iconName="alien" size={25} />}
          {!isCenter && assassin && <Icon iconName="assassin" size={25} />}
          {!isCenter && awesome && <Icon iconName="awesome" size={25} />}
          {!isCenter && babyalien && <Icon iconName="babyalien" size={25} />}
          {!isCenter && bat && <Icon iconName="bat" size={25} />}
          {!isCenter && blob && <Icon iconName="blob" size={25} />}
          {!isCenter && bulb && <Icon iconName="bulb" size={25} />}
          {!isCenter && clarity && <Icon iconName="clarity" size={25} />}
          {!isCenter && claw && <Icon iconName="claw" size={25} />}
          {!isCenter && cow && <Icon iconName="cow" size={25} />}
          {!isCenter && diseased && <Icon iconName="diseased" size={25} />}
          {!isCenter && dreamwolf && <Icon iconName="dreamwolf" size={25} />}
          {!isCenter && dress && <Icon iconName="dress" size={25} />}
          {!isCenter && drunk && <Icon iconName="drunk" size={25} />}
          {!isCenter && empath && <Icon iconName="empath" size={25} />}
          {!isCenter && evil && <Icon iconName="evil" size={25} />}
          {!isCenter && family && <Icon iconName="family" size={25} />}
          {!isCenter && fang && <Icon iconName="fang" size={25} />}
          {!isCenter && fear && <Icon iconName="fear" size={25} />}
          {!isCenter && friend && <Icon iconName="friend" size={25} />}
          {!isCenter && jest && <Icon iconName="jest" size={25} />}
          {!isCenter && like && <Icon iconName="like" size={25} />}
          {!isCenter && lovers && <Icon iconName="lover" size={25} />}
          {!isCenter && masons && <Icon iconName="mason" size={25} />}
          {!isCenter && mad && <Icon iconName="mad" size={25} />}
          {!isCenter && mortician && <Icon iconName="mortician" size={25} />}
          {!isCenter && nice && <Icon iconName="nice" size={25} />}
          {!isCenter && pretty && <Icon iconName="pretty" size={25} />}
          {!isCenter && seer && <Icon iconName="seer" size={25} />}
          {!isCenter && select && <Icon iconName="select" size={25} />}
          {!isCenter && smell && <Icon iconName="smell" size={25} />}
          {!isCenter && sus && <Icon iconName="sus" size={25} />}
          {!isCenter && swap && <Icon iconName="swap" size={25} />}
          {!isCenter && tanner && <Icon iconName="tanner" size={25} />}
          {!isCenter && tap && <Icon iconName="tap" size={25} />}
          {!isCenter && target && <Icon iconName="target" size={25} />}
          {!isCenter && traitor && <Icon iconName="traitor" size={25} />}
          {!isCenter && trophy && <Icon iconName="trophy" size={25} />}
          {!isCenter && ufo && <Icon iconName="ufo" size={25} />}
          {!isCenter && vampires && <Icon iconName="vampire" size={25} />}
          {!isCenter && villains && <Icon iconName="villain" size={25} />}
          {!isCenter && werewolves && <Icon iconName="werewolf" size={25} />}
        </Tokens>
        {!isCenter && hasMarks && <MarkBack markBackgroundImage={markImageSrc} selectable_marks={selectable_marks} onClick={() => markClickHandler()}          isSelectedMark={isSelectedMark}        />}
      </StyledBoardCard>
    )
  }
)
