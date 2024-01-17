const { wolfIdsToCheck, supervillainIdsToCheck } = require("../constant/ids")
const { logInfo } = require("../log")

exports.selectCard = (selectedCardIds, cardId) => {
    selectedCardIds.push(cardId)
    return Array.from(new Set(selectedCardIds))
}

exports.deselectCard = (selectedCardIds, cardId) => {
    const index = selectedCardIds.findIndex(
        (selectedCardId) => selectedCardId === cardId
    )
    if (index !== -1) {
        selectedCardIds.splice(index, 1)
    }
    return selectedCardIds
}

const shuffle = (selectedCardIds) => {
    for (let i = selectedCardIds.length - 1; i > 0; i--) {
        const j = ~~(Math.random() * (i + 1))
        ;[selectedCardIds[i], selectedCardIds[j]] = [selectedCardIds[j], selectedCardIds[i]]
    }
    return selectedCardIds
}

const filterCardsByIds = (selectedCardIds, idsToCheck) => selectedCardIds.filter(cardId => idsToCheck.includes(cardId))
const hasAlphaWolf = (selectedCardIds) => selectedCardIds.includes(17)
const hasTemptress = (selectedCardIds) => selectedCardIds.includes(69)
const getRandomNumber = (min, max) =>  ~~(Math.random() * (max - min + 1)) + min
const getRandomItemFromArray = (array) => array[getRandomNumber(0, array.length - 1)]

exports.distributeCards = (selectedCardIds) => {
    let cardIds = [...selectedCardIds]

    const chosenWolfId = hasAlphaWolf(selectedCardIds)
      ? getRandomItemFromArray(filterCardsByIds(cardIds, wolfIdsToCheck))
      : undefined

    const chosenSupervillainId = hasTemptress(selectedCardIds)
      ? getRandomItemFromArray(filterCardsByIds(cardIds, supervillainIdsToCheck))
      : undefined

    if (chosenWolfId) cardIds = cardIds.filter(cardId => cardId !== chosenWolfId)
    if (chosenSupervillainId) cardIds = cardIds.filter((cardId) => cardId !== chosenSupervillainId)

    const shuffledCards = shuffle(cardIds)

    const centerCards = shuffledCards.slice(0, 3)
    const playerCards = shuffledCards.slice(3)

    return {
      centerCards,
      playerCards,
      chosenWolfId,
      chosenSupervillainId,
    }
  }