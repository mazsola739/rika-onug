const { RESET, HYDRATE_ROOM } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");
const { repository } = require("../repository");
const { broadcast } = require("./connections");
const { upsertRoomState } = repository;

exports.reset = async (message) => {
  const { room_id } = message;
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors });

  const newGameState = { ...gameState, selected_cards: [] };

  upsertRoomState(newGameState);

  logTrace(
    `selectedCards reseted, new game state: ${JSON.stringify(newGameState)}`
  );
  return broadcast(room_id, { type: HYDRATE_ROOM, success: true, selected_cards: [] });
};
