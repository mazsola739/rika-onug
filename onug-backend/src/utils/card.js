
const cards = require("../data/cards.json")
//TODO NOT WORKING perfectly
const wolfIdsToCheck = [15, 16, 21, 22];
const supervillainIdsToCheck = [57, 60, 65];
const alphaWolfId = 15;
const temptressId = 60;
const mirrorManId = 64;
const copycatId = 30;

const toggleCard = (selectedCards, cardId, totalPlayers) => {
  const isSpecialCard =
    cardId === mirrorManId || cardId === copycatId;

  if (isSpecialCard && containsByCriteria(selectedCards, [mirrorManId, copycatId])) {
    const existingSpecialCard = selectedCards.find(
      (id) => id === mirrorManId || id === copycatId
    );
    existingSpecialCard && handleDeselectCard(selectedCards, existingSpecialCard);
  } else if (containsById(selectedCards, cardId)) {
    handleDeselectCard(selectedCards, cardId);
  } else if (totalPlayers < 12) {
    handleSelectCard(selectedCards, cardId);
  }
  return selectedCards
};

const containsByCriteria = (selectedCards, criteria) => criteria.some((c) => containsById(selectedCards, c));

const containsById = (selectedCards, cardId) => selectedCards.some((id) => id === cardId);

const handleSelectCard = (selectedCards, cardId) => {
  selectedCards.push(cardId);

  if (cardId === alphaWolfId) {
    handleCardByRole(selectedCards, wolfIdsToCheck, alphaWolfId);
  }
  if (cardId === temptressId) {
    handleCardByRole(selectedCards, supervillainIdsToCheck, temptressId);
  }
};

const handleDeselectCard = (selectedCards, cardId) => {
  let newSelectedCards;
  if (prohibitDeselectingWerewolf(selectedCards, cardId)) {
    handleCardByRole(selectedCards, wolfIdsToCheck, alphaWolfId);
  } else if (prohibitDeselectingSupervillain(selectedCards, cardId)) {
    handleCardByRole(selectedCards, supervillainIdsToCheck, temptressId);
  } else {
    newSelectedCards = selectedCards.filter((id) => id !== cardId);
  }
  return newSelectedCards
};

const handleCardByRole = (selectedCards, idsToCheck, defaultCardId) => {
  if (!containsByCriteria(selectedCards, idsToCheck)) {
    const cardToAdd = defaultCardId;
    selectedCards.push(cardToAdd);
  }
};

const prohibitDeselectingWerewolf = (selectedCards, card) => {
  const numberOfSelectedWolfCards = selectedCards.filter((id) =>
    wolfIdsToCheck.includes(id)
  ).length;

  return (
    numberOfSelectedWolfCards === 1 &&
    containsByCriteria(selectedCards, [alphaWolfId]) &&
    wolfIdsToCheck.includes(card)
  );
};

const prohibitDeselectingSupervillain = (selectedCards, card) => {
  const numberOfSelectedVillainCards = selectedCards.filter((id) =>
    supervillainIdsToCheck.includes(id)
  ).length;

  return (
    numberOfSelectedVillainCards === 1 &&
    containsByCriteria(selectedCards, [temptressId]) &&
    supervillainIdsToCheck.includes(card)
  );
};


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
const isCardSelectedById = (cardIds, cardId) => cardIds.some((id) => id === cardId)

module.exports = {
  toggleCard,
  distributeCards,
  isCardSelectedById,
  getCardById,
  getRandomItemFromArray,
  filterCardsByIds,
  hasAlphaWolf,
  hasTemptress,
  getRandomNumber,
}
