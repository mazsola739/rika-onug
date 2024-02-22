//@ts-check
import cards from '../data/cards.json';

const wolfIdsToCheck = [15, 16, 21, 22]
const supervillainIdsToCheck = [57, 60, 65]
const alphaWolfId = 17
const temptressId = 69
const mirrorManId = 64
const copycatId = 30
const specialCardsDefaultToAddLookupMap = {
  17: 15,
  69: 60,
}

export const toggleCardSelect = (selectedCards, cardId, totalPlayers) => {
  let newSelectedCards = [...selectedCards]

  if (containsById(selectedCards, cardId)) {
    newSelectedCards = handleDeselectCard(newSelectedCards, cardId)
  } else if (totalPlayers < 12) {
    newSelectedCards = handleSelectCard(newSelectedCards, cardId)
  }
  return newSelectedCards
}

const containsByIdsToCheck = (selectedCards, idsToCheck) =>
  idsToCheck.some((id) => containsById(selectedCards, id))

const containsById = (selectedCards, cardId) =>
  selectedCards.some((id) => id === cardId)

const handleSelectCard = (selectedCards, cardId) => {
  let newSelectedCards = [...selectedCards]
  newSelectedCards.push(cardId)

  if (cardId === alphaWolfId) {
    handleCardById(newSelectedCards, wolfIdsToCheck, alphaWolfId)
  } else if (cardId === temptressId) {
    handleCardById(newSelectedCards, supervillainIdsToCheck, temptressId)
  } else if (
    cardId === mirrorManId &&
    containsByIdsToCheck(selectedCards, [copycatId])
  ) {
    newSelectedCards = newSelectedCards.filter((id) => id !== copycatId)
  } else if (
    cardId === copycatId &&
    containsByIdsToCheck(selectedCards, [mirrorManId])
  ) {
    newSelectedCards = newSelectedCards.filter((id) => id !== mirrorManId)
  }

  return newSelectedCards
}

const handleDeselectCard = (selectedCards, cardId) => {
  let newSelectedCards = [...selectedCards]
  if (prohibitDeselectingWerewolf(selectedCards, cardId)) {
    handleCardById(newSelectedCards, wolfIdsToCheck, alphaWolfId)
  } else if (prohibitDeselectingSupervillain(selectedCards, cardId)) {
    handleCardById(newSelectedCards, supervillainIdsToCheck, temptressId)
  } else {
    newSelectedCards = selectedCards.filter((id) => id !== cardId)
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
  const numberOfSelectedWolfCards = selectedCards.filter((cardId) =>
    wolfIdsToCheck.includes(cardId)
  ).length

  return (
    numberOfSelectedWolfCards === 1 &&
    containsByIdsToCheck(selectedCards, [alphaWolfId]) &&
    wolfIdsToCheck.includes(cardId)
  )
}

const prohibitDeselectingSupervillain = (selectedCards, card) => {
  const numberOfSelectedVillainCards = selectedCards.filter((id) =>
    supervillainIdsToCheck.includes(id)
  ).length

  return (
    numberOfSelectedVillainCards === 1 &&
    containsByIdsToCheck(selectedCards, [temptressId]) &&
    supervillainIdsToCheck.includes(card)
  )
}

const shuffle = (selectedCardIds) => {
  for (let i = selectedCardIds.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1))
    ;[selectedCardIds[i], selectedCardIds[j]] = [selectedCardIds[j], selectedCardIds[i]]
  }
  return selectedCardIds
}

export const filterCardsByIds = (selectedCardIds, idsToCheck) =>
  selectedCardIds.filter((cardId) => idsToCheck.includes(cardId))
export const hasAlphaWolf = (selectedCardIds) => selectedCardIds.includes(17)
export const hasTemptress = (selectedCardIds) => selectedCardIds.includes(69)
export const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min
export const getRandomItemFromArray = (array) =>
  array[getRandomNumber(0, array.length - 1)]

export const distributeCards = (selectedCardIds) => {
  let cardIds = [...selectedCardIds]

  const newWolfCardId = hasAlphaWolf(selectedCardIds)
    ? getRandomItemFromArray(filterCardsByIds(cardIds, wolfIdsToCheck))
    : undefined

  const newVillainCardId = hasTemptress(selectedCardIds)
    ? getRandomItemFromArray(filterCardsByIds(cardIds, supervillainIdsToCheck))
    : undefined

  if (newWolfCardId)
    cardIds = cardIds.filter((cardId) => cardId !== newWolfCardId)
  if (newVillainCardId)
    cardIds = cardIds.filter((cardId) => cardId !== newVillainCardId)

  const shuffledCards = shuffle(cardIds)

  const centerCardIds = shuffledCards.slice(0, 3)
  const playerCardIds = shuffledCards.slice(3)

  const centerCards = centerCardIds.map((cardId) => getCardById(cardId))
  const playerCards = playerCardIds.map((cardId) => getCardById(cardId))

  return {
    centerCards,
    playerCards,
    newWolfCardId,
    newVillainCardId,
  }
}

export const getCardById = (card_id) => cards.find((card) => card.id === card_id)
export const isCardSelectedById = (cardIds, cardId) =>
  cardIds.some((id) => id === cardId)
