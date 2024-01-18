const { validateRoom } = require("../validator");
const { determineTotalPlayers, toogleCard } = require("../utils");
const { repository } = require("../repository");
const { upsertRoomState } = repository;
const { HYDRATE_ROOM } = require("../constant/ws");
const { broadcast } = require("./connections");

exports.updateRoom = async (message) => {
  const { room_id, card_id, token } = message;
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors });

  const totalPlayers = determineTotalPlayers(
    gameState.selected_cards.length,
    gameState.selected_cards
  );

  if (totalPlayers > 12) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors: ["Cannot have more than 12 players."] });

  const newGameState = { ...gameState };

  // TODO validate if player is admin
  newGameState.selected_cards = toogleCard(
    newGameState.selected_cards,
    card_id
  );

  upsertRoomState(newGameState);
  return broadcast(room_id, { type: HYDRATE_ROOM, success: true, selected_cards: newGameState.selected_cards });
};
