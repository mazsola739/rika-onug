const { DEAL, REDIRECT } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");
const { repository } = require("../repository");
const { STAGES } = require("../constant/stage");
const { broadcast } = require("./connections");
const { upsertRoomState } = repository;
const cards = require("../data/cards.json");

const alphaWolfId = 17;
const temptressId = 69;

const wolfIdsToCheck = [15, 16, 21, 22];
const supervillainIdsToCheck = [57, 60, 65];

const markIds = [28, 29, 31, 32, 34, 38, 39, 40, 41];

const hasAlphaWolf = (selectedCardIds) => selectedCardIds.includes(alphaWolfId);
const hasTemptress = (selectedCardIds) => selectedCardIds.includes(temptressId);
const hasMark = (selectedCardIds) =>
  markIds.some((id) => selectedCardIds.includes(id));

const getCardById = (card_id) => cards.find((card) => card.id === card_id);
const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min;
const getRandomItemFromArray = (array) =>
  array[getRandomNumber(0, array.length - 1)];
const filterCardsByIds = (selectedCardIds, idsToCheck) =>
  selectedCardIds.filter((cardId) => idsToCheck.includes(cardId));

const shuffle = (selectedCardIds) => {
  for (let i = selectedCardIds.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));
    [selectedCardIds[i], selectedCardIds[j]] = [
      selectedCardIds[j],
      selectedCardIds[i],
    ];
  }
  return selectedCardIds;
};

const dealCardIds = (selectedCardIds) => {
  let cardIds = [...selectedCardIds];

  const newWolfCardId = hasAlphaWolf(selectedCardIds)
    ? getRandomItemFromArray(filterCardsByIds(cardIds, wolfIdsToCheck))
    : undefined;
  const newVillainCardId = hasTemptress(selectedCardIds)
    ? getRandomItemFromArray(filterCardsByIds(cardIds, supervillainIdsToCheck))
    : undefined;

  if (newWolfCardId)
    cardIds = cardIds.filter((cardId) => cardId !== newWolfCardId);
  if (newVillainCardId)
    cardIds = cardIds.filter((cardId) => cardId !== newVillainCardId);

  const shuffledCards = shuffle(cardIds);

  const centerCardIds = shuffledCards.slice(0, 3);
  const playerCardIds = shuffledCards.slice(3);

  const playerCards = playerCardIds.map((id) => getCardById(id));
  const centerCards = centerCardIds.map((id) => getCardById(id));
  const newWolfCard = getCardById(newWolfCardId);
  const newVillainCard = getCardById(newVillainCardId);

  return {
    playerCards,
    centerCards,
    newWolfCard,
    newVillainCard,
  };
};

const createPlayerCard = (card, selected_cards) => {
  if (!card || typeof card !== "object" || !card.id) {
    return { id: 0, card: { role: "", team: "", mark: false } };
  }

  return {
    id: card.id,
    card: {
      role: card.display_name,
      team: card.team,
      mark: hasMark(selected_cards),
    },
  };
};

const createCenterCard = (card, selected_cards) => {
  if (!card || typeof card !== "object" || !card.id) {
    return { id: 0, card: { role: "", team: "" } };
  }

  return {
    id: card.id,
    card: {
      role: card.display_name,
      team: card.team,
    },
  };
};

exports.dealCards = async (ws, message) => {
  const { room_id } = message;
  logTrace(`Dealing cards for players in room: ${room_id}`);
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: DEAL, success: false, errors }));

  const selectedCards = gameState.selected_cards;

  const { playerCards, centerCards, newWolfCard, newVillainCard } =
    dealCardIds(selectedCards);

  const leftCard = centerCards[0];
  const middleCard = centerCards[1];
  const rightCard = centerCards[2];

  const newGameState = {
    ...gameState,
    stage: STAGES.GAME_TABLE,
    center_cards: {
      center_left_card:    createCenterCard(leftCard, selectedCards),
      center_middle_car:   createCenterCard(middleCard, selectedCards),
      center_right_card:   createCenterCard(rightCard, selectedCards),
      center_wolf_card:    createCenterCard(newWolfCard, selectedCards),
      center_villain_card: createCenterCard(newVillainCard, selectedCards),
    },
  };

  const playerTokens = Object.keys(gameState.players);

  playerTokens.forEach((token, index) => {
    newGameState.players[token] = {
      ...gameState.players[token],
      card:  createPlayerCard(playerCards[index], selectedCards),
      player_number: index + 1,
    };
  });

  await upsertRoomState(newGameState);

  const redirectToGameTable = {
    type: REDIRECT,
    path: `/gametable/${room_id}`,
  };

  return broadcast(room_id, redirectToGameTable);
};
