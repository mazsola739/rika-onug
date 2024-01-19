const { TO_GAME_TABLE } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");
const { repository } = require("../repository");
const { STAGES } = require("../constant/stage");
const { distributeCards } = require("../utils/card");
const { broadcastPlayGame } = require("./connections");
const { upsertRoomState } = repository;

exports.toGameTable = async (ws, message) => {
  const { room_id, token } = message;
  logTrace(`Everybody is sit down at the gametable in room: ${room_id}`);
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: TO_GAME_TABLE, success: false, errors }));

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

  return broadcastPlayGame(newRoomState);
};
