const { PLAY_GAME } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");
const { repository } = require("../repository");
const { STAGES } = require("../constant/stage");
const { distributeCards } = require("../utils/card");
const { broadcastPlayGame } = require("./connections");
const { upsertRoomState } = repository;

exports.playGame = async (ws, message) => {
  const { room_id, token } = message;
  logTrace(`Game started in room: ${room_id}`);
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: PLAY_GAME, success: false, errors }));

  const player = gameState.players[token];

  const { centerCards, playerCards, chosenWolfId, chosenSupervillainId } =
    distributeCards(gameState.selected_cards);

  const newRoomState = {
    ...gameState,
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
      stage: STAGES.GAME_TABLE,
      player_card: playerCards[index],
      player_number: index + 1,
    };
  });

  // TODO validate player
  await upsertRoomState(newRoomState);

  return broadcastPlayGame(newRoomState);
};
