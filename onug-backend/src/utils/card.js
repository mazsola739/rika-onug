const { wolfIdsToCheck, supervillainIdsToCheck } = require("../constant/ids")
const cards = require("../data/cards.json")

const toggleCard = (selectedCardIds, cardId) => {
  //TODO ALPHA WOLF AND TEMPTRESS, COPYCAT/MIRROR MAN
  if (selectedCardIds.includes(cardId)) {
    const index = selectedCardIds.findIndex(
      (selectedCardId) => selectedCardId === cardId
    )
    if (index !== -1) {
      selectedCardIds.splice(index, 1)
    }
    return selectedCardIds
  } else {
    selectedCardIds.push(cardId)
    return Array.from(new Set(selectedCardIds))
  }
}

const shuffle = (selectedCardIds) => {
  for (let i = selectedCardIds.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1))
    ;[selectedCardIds[i], selectedCardIds[j]] = [selectedCardIds[j],selectedCardIds[i],]
  }
  return selectedCardIds
}

const filterCardsByIds = (selectedCardIds, idsToCheck) =>
  selectedCardIds.filter((cardId) => idsToCheck.includes(cardId))
const hasAlphaWolf = (selectedCardIds) => selectedCardIds.includes(17)
const hasTemptress = (selectedCardIds) => selectedCardIds.includes(69)
const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min
const getRandomItemFromArray = (array) =>
  array[getRandomNumber(0, array.length - 1)]

const distributeCards = (selectedCardIds) => {
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

const getCardById = (card_id) => cards.find((card) => card.id === card_id)
const isCardSelectedById = (cardIds, cardId) =>
  cardIds.some((id) => id === cardId)
const includesAny = (cardIds, cardIdsToCheck) =>
  cardIdsToCheck.some((cardId) => isCardSelectedById(cardIds, cardId))
const includesAll = (cardIds, cardIdsToCheck) =>
  cardIdsToCheck.every((cardId) => isCardSelectedById(cardIds, cardId))

const masonsInPlay = (cardIds) =>
  includesAll(cardIds, [5, 6]) ||
  (cardIds.includes(1) && includesAny(cardIds, [5, 6]))
const anyMasonsInPlay = (cardIds) =>
  includesAny(cardIds, [5, 6]) ||
  (cardIds.includes(1) && includesAny(cardIds, [5, 6]))
const werewolvesInPlay = (cardIds) => includesAny(cardIds, [15, 16])
const multipleWerewolvesAtPlay = (cardIds) => includesAll(cardIds, [15, 16])
const getCardPositionNamesForPlayers = (gameState, playerToExclude) =>
  Object.values(gameState.players).flatMap((player) =>
    player.player_number === playerToExclude ? [] : player.player_number
  )
const getWerewolfCardPositionNamesForPlayers = (gameState) =>
  Object.values(gameState.players).flatMap((player) =>
    werewolvesInPlay([player.card.id]) ? player.player_number : []
  )
const getMasonCardPositionNamesForPlayers = (gameState) =>
  Object.values(gameState.players).flatMap((player) =>
    anyMasonsInPlay([player.card.id]) ? player.player_number : []
  )
const getCenterCardPositions = () => [1, 2, 3]
const getAllPositions = (gameState, playerToExclude) => ({
  center: getCardPositionNamesForPlayers(),
  players: getCardPositionNamesForPlayers(gameState, playerToExclude),
})

module.exports = {
  toggleCard,
  distributeCards,
  getCardPositionNamesForPlayers,
  masonsInPlay,
  werewolvesInPlay,
  includesAll,
  includesAny,
  isCardSelectedById,
  getCardById,
  getRandomItemFromArray,
  filterCardsByIds,
  hasAlphaWolf,
  hasTemptress,
  getRandomNumber,
  getWerewolfCardPositionNamesForPlayers,
  multipleWerewolvesAtPlay,
  getCenterCardPositions,
  getMasonCardPositionNamesForPlayers,
  getAllPositions,
}
