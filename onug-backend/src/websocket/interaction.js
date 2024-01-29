const { logDebug, logError } = require("../log");
const { repository } = require("../repository");
const { alphawolf_response } = require("../scene/interaction/roles/alphawolf");
const { readGameState, upsertRoomState } = repository;

exports.interaction = async (ws, message) => {
  try {
    logDebug(`Interaction requested with ${JSON.stringify(message)}`);
    const { room_id, token, selected_positions } = message;
    const gameState = await readGameState(room_id);
    // TODO validate client request

    // TODO all other roles
    const newGameState = alphawolf_response(gameState, selected_positions, ws)

    await upsertRoomState(newGameState);

  } catch (error) {
    logError(error);
  }
};
 