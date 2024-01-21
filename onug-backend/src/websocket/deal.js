const { DEAL, REDIRECT } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");
const { repository } = require("../repository");
const { STAGES } = require("../constant/stage");
const { distributeCards } = require("../utils/card");
const { broadcast } = require("./connections");
const { upsertRoomState } = repository;

exports.deal = async (ws, message) => {
  const { room_id, token } = message;
  logTrace(`Dealing cards for players in room: ${room_id}`);
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: DEAL, success: false, errors }));

  const player = gameState.players[token];

  const { centerCards, playerCards, chosenWolfId, chosenSupervillainId } =
    distributeCards(gameState.selected_cards);

  const newRoomState = {
    ...gameState,
    stage: STAGES.GAME_TABLE,
    center_cards: {
      base: centerCards,
      chosenWolfId,
      chosenSupervillainId,
    },
  };
  const playerTokens = Object.keys(gameState.players);

  playerTokens.forEach((token, index) => {
    newRoomState.players[token] = {
      ...gameState.players[token],
      player_card: playerCards[index],
      player_number: index + 1,
    };
  });

  // TODO validate player
  await upsertRoomState(newRoomState);

  const redirectToGameTable = {
    type: REDIRECT,
    path: `/gametable/${room_id}`
  }
  return broadcast(room_id, redirectToGameTable)
};
