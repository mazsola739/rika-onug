const { RESET } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");
const { repository } = require("../repository");
const { upsertRoomState } = repository;

exports.reset = async (ws, message) => {
  const { room_id } = message;
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: RESET, success: false, errors }));

  const newGameState = { ...gameState, selected_cards: [] };

  upsertRoomState(newGameState);

  logTrace(
    `selectedCards reseted, new game state: ${JSON.stringify(newGameState)}`
  );
  return ws.send(JSON.stringify({ type: RESET, success: true }));
};
