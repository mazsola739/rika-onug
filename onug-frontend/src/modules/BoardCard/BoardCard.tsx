import { Token, Icon } from 'components'
import { useClickHandler } from 'hooks'
import { observer } from 'mobx-react-lite'
import { useState, useMemo } from 'react'
import { dealingStore, deckStore, interactionStore } from 'store'
import { StyledBoardCard, Tokens, CardBack, MarkBack } from './BoardCard.styles'
import { BoardCardProps } from './BoardCard.types'
import { IconType } from 'components/Icon/Icon.types'

const useCardImageSrc = (cardId: number) => {
  const card = cardId === 0 ? '' : deckStore.getCardById(cardId)
  
  return useMemo(() => {
    if (!card || card.id === 0) {
      return '/assets/playingcards/card_background.png'
    }

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
      return `/assets/playingcards/${card_name}${randomDeluxe}.png`
    }
    return `/assets/playingcards/${card.card_name}.png`
  }, [card])
}

const useMarkImageSrc = (markId: string) => {
  return markId && markId.length !== 0 ? `/assets/tokens/${markId}.png` : '/assets/tokens/mark_back.png'
}

const CardTokens = ({ position, shield, artifact }: any) => (
  <Tokens>
    <Token tokenName={position} size={25} />
    {shield && <Token tokenName="shield" size={25} />}
    {artifact && <Token tokenName="artifact_back" size={25} />}
  </Tokens>
)

const BoardIcons = ({ isCenter, iconList }: { isCenter: boolean, iconList: Array<keyof BoardCardProps> }) => (
  <Tokens>
    {iconList.map((icon) => (
      <Icon key={icon} iconName={icon as IconType} size={25} />
    ))}
  </Tokens>
)

const BoardCard: React.FC<BoardCardProps> = observer(({ isCenter, boardCard }) => {
  const { position, cardId, markId, selectable_cards, selectable_marks, ...icons } = boardCard
  const [isSelectedCard, setIsSelectedCard] = useState(false)
  const [isSelectedMark, setIsSelectedMark] = useState(false)
  const { hasMarks } = dealingStore
  const cardImageSrc = useCardImageSrc(cardId)
  const markImageSrc = useMarkImageSrc(markId)
  
  const room_id = sessionStorage.getItem('room_id')
  const token = sessionStorage.getItem('token')
  const { handleCardInteraction, handleMarkInteraction } = useClickHandler(room_id, token)
  
  const cardClickHandler = (cardType: string) => {
    const maxCenterCardSelection = interactionStore.selectableCenterCardLimit
    const maxPlayerCardSelection = interactionStore.selectablePlayerCardLimit
    
    if (selectable_cards) {
      const isCenterCardType = cardType === 'center'
      const selectedCards = isCenterCardType ? interactionStore.selectedCenterCards : interactionStore.selectedPlayerCards
      const maxSelectionLimit = isCenterCardType ? maxCenterCardSelection : maxPlayerCardSelection
      const hasOppositeSelected = isCenterCardType ? interactionStore.selectedPlayerCards.length > 0 : interactionStore.selectedCenterCards.length > 0
      
      interactionStore.setSelectedMarks([])
      setIsSelectedMark(false)
      
      if (isSelectedCard && selectedCards.includes(position)) {
        const updatedSelectedCards = selectedCards.filter((cardPos) => cardPos !== position)
        isCenterCardType ? interactionStore.setSelectedCenterCards(updatedSelectedCards) : interactionStore.setSelectedPlayerCards(updatedSelectedCards)
        interactionStore.setSelectedCards(updatedSelectedCards)
        setIsSelectedCard(false)
      } else if (selectedCards.length < maxSelectionLimit) {
        const updatedSelectedCards = [...selectedCards, position]
        isCenterCardType ? interactionStore.setSelectedCenterCards(updatedSelectedCards) : interactionStore.setSelectedPlayerCards(updatedSelectedCards)
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
        const updatedSelectedMarks = selectedMarks.filter((markPos) => markPos !== position)
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
  
  const iconList = Object.keys(icons)
    .filter((icon) => icons[icon as keyof typeof icons])
    .map((iconName) => iconName as keyof BoardCardProps)

  return (
    <StyledBoardCard>
      {!isCenter && <CardTokens position={position} shield={boardCard.shield} artifact={boardCard.artifact} />}
      <CardBack cardBackgroundImage={cardImageSrc} selectable_cards={selectable_cards} onClick={() => cardClickHandler(isCenter ? 'center' : 'player')} isSelectedCard={isSelectedCard} />
      <BoardIcons isCenter={isCenter} iconList={iconList} />
      {!isCenter && hasMarks && <MarkBack markBackgroundImage={markImageSrc} selectable_marks={selectable_marks} onClick={markClickHandler} isSelectedMark={isSelectedMark} />}
    </StyledBoardCard>
  )
})

export default BoardCard
