import { SUPER_VILLAIN_TO_CHECK, WEREVOLVES_TO_CHECK } from '../constants'
import { cardsJson } from '../data'

const specialCardsDefaultToAddLookupMap = {
  17: 15,
  69: 60
}

export const filterCardsByExpansions = (selectedCards, selectedExpansions) => {
  return selectedCards.filter(cardId => {
    const card = getCardById(cardId)
    return card && selectedExpansions.includes(card.expansion)
  })
}

export const toggleExpansions = (selectedExpansions, expansion) => {
  const newSelectedExpansions = [...selectedExpansions]

  const index = newSelectedExpansions.indexOf(expansion)
  if (index !== -1) {
    newSelectedExpansions.splice(index, 1)
  } else {
    newSelectedExpansions.push(expansion)
  }

  return newSelectedExpansions
}

export const toggleCardSelect = (selectedCards, selectedExpansions, cardId, totalPlayers) => {
  let newSelectedCards = [...selectedCards]
  const card = getCardById(cardId)

  if (card && selectedExpansions.includes(card.expansion)) {
    if (containsById(selectedCards, cardId)) {
      newSelectedCards = handleDeselectCard(newSelectedCards, cardId)
    } else if (totalPlayers < 12) {
      newSelectedCards = handleSelectCard(newSelectedCards, cardId)
    }
  }
  return newSelectedCards
}

const containsByIdsToCheck = (selectedCards, idsToCheck) => idsToCheck.some(id => containsById(selectedCards, id))

const containsById = (selectedCards, cardId) => selectedCards.some(id => id === cardId)

const handleSelectCard = (selectedCards, cardId) => {
  let newSelectedCards = [...selectedCards]
  newSelectedCards.push(cardId)

  if (cardId === 17) {
    handleCardById(newSelectedCards, WEREVOLVES_TO_CHECK, 17)
  } else if (cardId === 69) {
    handleCardById(newSelectedCards, SUPER_VILLAIN_TO_CHECK, 69)
  } else if (cardId === 64 && containsByIdsToCheck(selectedCards, [30])) {
    newSelectedCards = newSelectedCards.filter(id => id !== 30)
  } else if (cardId === 30 && containsByIdsToCheck(selectedCards, [64])) {
    newSelectedCards = newSelectedCards.filter(id => id !== 64)
  }

  return newSelectedCards
}

const handleDeselectCard = (selectedCards, cardId) => {
  let newSelectedCards = [...selectedCards]
  if (prohibitDeselectingWerewolf(selectedCards, cardId)) {
    handleCardById(newSelectedCards, WEREVOLVES_TO_CHECK, 17)
  } else if (prohibitDeselectingSupervillain(selectedCards, cardId)) {
    handleCardById(newSelectedCards, SUPER_VILLAIN_TO_CHECK, 69)
  } else {
    newSelectedCards = selectedCards.filter(id => id !== cardId)
  }
  return newSelectedCards
}

const handleCardById = (selectedCards, idsToCheck, specialCardId) => {
  if (!containsByIdsToCheck(selectedCards, idsToCheck)) {
    const cardToAdd = specialCardsDefaultToAddLookupMap[specialCardId]
    selectedCards.push(cardToAdd)
  }
}

const prohibitDeselectingWerewolf = (selectedCards, cardId) => {
  const numberOfSelectedWolfCards = selectedCards.filter(cardId => WEREVOLVES_TO_CHECK.includes(cardId)).length

  return numberOfSelectedWolfCards === 1 && containsByIdsToCheck(selectedCards, [17]) && WEREVOLVES_TO_CHECK.includes(cardId)
}

const prohibitDeselectingSupervillain = (selectedCards, card) => {
  const numberOfSelectedVillainCards = selectedCards.filter(id => SUPER_VILLAIN_TO_CHECK.includes(id)).length

  return numberOfSelectedVillainCards === 1 && containsByIdsToCheck(selectedCards, [69]) && SUPER_VILLAIN_TO_CHECK.includes(card)
}

const shuffle = selectedCardIds => {
  for (let i = selectedCardIds.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1))
    ;[selectedCardIds[i], selectedCardIds[j]] = [selectedCardIds[j], selectedCardIds[i]]
  }
  return selectedCardIds
}

export const filterCardsByIds = (selectedCardIds, idsToCheck) => selectedCardIds.filter(cardId => idsToCheck.includes(cardId))
export const hasAlphaWolf = selectedCardIds => selectedCardIds.includes(17)
export const hasTemptress = selectedCardIds => selectedCardIds.includes(69)
export const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min
export const getRandomItemFromArray = array => array[getRandomNumber(0, array.length - 1)]

export const distributeCards = selectedCardIds => {
  let cardIds = [...selectedCardIds]

  const newWolfCardId = hasAlphaWolf(selectedCardIds) ? getRandomItemFromArray(filterCardsByIds(cardIds, WEREVOLVES_TO_CHECK)) : undefined

  const newVillainCardId = hasTemptress(selectedCardIds) ? getRandomItemFromArray(filterCardsByIds(cardIds, SUPER_VILLAIN_TO_CHECK)) : undefined

  if (newWolfCardId) cardIds = cardIds.filter(cardId => cardId !== newWolfCardId)
  if (newVillainCardId) cardIds = cardIds.filter(cardId => cardId !== newVillainCardId)

  const shuffledCards = shuffle(cardIds)

  const centerCardIds = shuffledCards.slice(0, 3)
  const playerCardIds = shuffledCards.slice(3)

  const centerCards = centerCardIds.map(cardId => getCardById(cardId))
  const playerCards = playerCardIds.map(cardId => getCardById(cardId))

  return {
    centerCards,
    playerCards,
    newWolfCardId,
    newVillainCardId
  }
}

export const getCardById = card_id => cardsJson.find(card => card.id === card_id)

export const isCardSelectedById = (cardIds, cardId) => cardIds.some(id => id === cardId)
