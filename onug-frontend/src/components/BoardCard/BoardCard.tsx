import { Token, Icon } from 'components'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { gameTableStore, deckStore, interactionStore } from 'store'
import { StyledBoardCard, Tokens, CardBack, MarkBack } from './BoardCard.styles'
import { BoardCardProps } from './BoardCard.types'

export const BoardCard: React.FC<BoardCardProps> = observer(
  ({ isCenter, boardCard}) => {
    const {
      position,
      id,
      mark,
      selectable_cards,
      selectable_marks,
      shield,
      artifact,
      fang,
      fear,
      bat,
      diseased,
      cupid,
      traitor,
      clarity,
      target,
      aerial,
      alien,
      alienhand,
      artifacted,
      assassin,
      blob,
      claw,
      copy,
      detector,
      dog,
      dreamwolf,
      drunk,
      evilhand,
      family,
      gremlin,
      groobzerb,
      idcard,
      interaction,
      investigator,
      lonely,
      lover,
      mad,
      mason,
      mortician,
      mystic,
      nostradamus,
      peeker,
      prank,
      robber,
      seer,
      sentinel,
      swap,
      tanner,
      tap,
      thumb,
      ufo,
      vampire,
      villain,
      voodoo,
      werewolf,
      witch,
    } = boardCard
    const [isSelectedCard, setIsSelectedCard] = useState(false)
    const [isSelectedMark, setIsSelectedMark] = useState(false)
    const { hasMarks } = gameTableStore
    const card = id === 0 ? '' : deckStore.getCardById(id)

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

    const markImageSrc =
      mark && mark.length !== 0
        ? `/assets/tokens/${mark}.png`
        : '/assets/tokens/mark_back.png'

    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')
    const { handleCardInteraction, handleMarkInteraction } = useClickHandler(
      room_id,
      token
    )

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
          const updatedSelectedCards = selectedCards.filter((cardPos) => cardPos !== position)
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

        interactionStore.selectedCards.length === maxSelectionLimit &&
          handleCardInteraction(interactionStore.selectedCards)
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
          const updatedSelectedMarks = selectedMarks.filter((markPos) => markPos !== position)
          interactionStore.setSelectedMarks(updatedSelectedMarks)
          setIsSelectedMark(false)
        } else if (selectedMarks.length < maxMarkSelection) {
          const updatedSelectedMarks = [...selectedMarks, position]
          interactionStore.setSelectedMarks(updatedSelectedMarks)
          setIsSelectedMark(true)
        }
      }

      interactionStore.selectedMarks.length === maxMarkSelection &&
        handleMarkInteraction(interactionStore.selectedMarks)
    }

    return (
      <StyledBoardCard>
        {!isCenter && (
          <Tokens>
            {!isCenter && <Token tokenName={position} size={25} />}
            {!isCenter && shield && <Token tokenName="shield" size={25} />}
            {!isCenter && artifact && <Token tokenName="artifact_back" size={25} />}
          </Tokens>
        )}
        <CardBack cardBackgroundImage={cardImageSrc} selectable_cards={selectable_cards} onClick={() => cardClickHandler(isCenter ? 'center' : 'player')} isSelectedCard={isSelectedCard} />
        <Tokens>
          {!isCenter && fang && <Icon iconName="fang" size={25} />}
          {!isCenter && fear && <Icon iconName="fear" size={25} />}
          {!isCenter && bat && <Icon iconName="bat" size={25} />}
          {!isCenter && diseased && <Icon iconName="diseased" size={25} />}
          {!isCenter && cupid && <Icon iconName="cupid" size={25} />}
          {!isCenter && traitor && <Icon iconName="traitor" size={25} />}
          {!isCenter && clarity && <Icon iconName="clarity" size={25} />}
          {!isCenter && target && <Icon iconName="target" size={25} />}

          {!isCenter && aerial && <Icon iconName="aerial" size={25} />}
          {!isCenter && alien && <Icon iconName="alien" size={25} />}
          {!isCenter && alienhand && <Icon iconName="alienhand" size={25} />}
          {!isCenter && artifacted && <Icon iconName="artifacted" size={25} />}
          {!isCenter && assassin && <Icon iconName="assassin" size={25} />}
          {!isCenter && blob && <Icon iconName="blob" size={25} />}
          {!isCenter && claw && <Icon iconName="claw" size={25} />}
          {!isCenter && copy && <Icon iconName="copy" size={25} />}
          {!isCenter && detector && <Icon iconName="detector" size={25} />}
          {!isCenter && dog && <Icon iconName="dog" size={25} />}
          {!isCenter && dreamwolf && <Icon iconName="dreamwolf" size={25} />}
          {!isCenter && drunk && <Icon iconName="drunk" size={25} />}
          {!isCenter && evilhand && <Icon iconName="evilhand" size={25} />}
          {!isCenter && family && <Icon iconName="family" size={25} />}
          {!isCenter && gremlin && <Icon iconName="gremlin" size={25} />}
          {!isCenter && groobzerb && <Icon iconName="groobzerb" size={25} />}
          {!isCenter && idcard && <Icon iconName="idcard" size={25} />}
          {!isCenter && interaction && <Icon iconName="interaction" size={25} />}
          {!isCenter && investigator && <Icon iconName="investigator" size={25} />}
          {!isCenter && lover && <Icon iconName="lover" size={25} />}
          {!isCenter && mad && <Icon iconName="mad" size={25} />}
          {!isCenter && mason && <Icon iconName="mason" size={25} />}
          {!isCenter && mortician && <Icon iconName="mortician" size={25} />}
          {!isCenter && mystic && <Icon iconName="mystic" size={25} />}
          {!isCenter && nostradamus && <Icon iconName="nostradamus" size={25} />}
          {!isCenter && peeker && <Icon iconName="peeker" size={25} />}
          {!isCenter && prank && <Icon iconName="prank" size={25} />}
          {!isCenter && robber && <Icon iconName="robber" size={25} />}
          {!isCenter && seer && <Icon iconName="seer" size={25} />}
          {!isCenter && sentinel && <Icon iconName="sentinel" size={25} />}
          {!isCenter && swap && <Icon iconName="swap" size={25} />}
          {!isCenter && tanner && <Icon iconName="tanner" size={25} />}
          {!isCenter && tap && <Icon iconName="tap" size={25} />}
          {!isCenter && thumb && <Icon iconName="thumb" size={25} />}
          {!isCenter && ufo && <Icon iconName="ufo" size={25} />}
          {!isCenter && vampire && <Icon iconName="vampire" size={25} />}
          {!isCenter && villain && <Icon iconName="villain" size={25} />}
          {!isCenter && voodoo && <Icon iconName="voodoo" size={25} />}
          {!isCenter && werewolf && <Icon iconName="werewolf" size={25} />}
          {!isCenter && witch && <Icon iconName="witch" size={25} />}

          {isCenter && alienhand && <Icon iconName="alienhand" size={25} />}
          {isCenter && copy && <Icon iconName="copy" size={25} />}
          {isCenter && drunk && <Icon iconName="drunk" size={25} />}
          {isCenter && idcard && <Icon iconName="idcard" size={25} />}
          {isCenter && lonely && <Icon iconName="lonely" size={25} />}
          {isCenter && prank && <Icon iconName="prank" size={25} />}
          {isCenter && seer && <Icon iconName="seer" size={25} />}
          {isCenter && swap && <Icon iconName="swap" size={25} />}
          {isCenter && voodoo && <Icon iconName="voodoo" size={25} />}
          {isCenter && witch && <Icon iconName="witch" size={25} />}
        </Tokens>
        {!isCenter && hasMarks && (
          <MarkBack
            markBackgroundImage={markImageSrc}
            selectable_marks={selectable_marks}
            onClick={() => markClickHandler()}
            isSelectedMark={isSelectedMark}
          />
        )}
      </StyledBoardCard>
    )
  }
)
