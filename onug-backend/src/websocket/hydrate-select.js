const { PLAY_GAME, HYDRATE_SELECT } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");

exports.hydrateSelect = async (ws, message) => {
  const { room_id } = message;
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(
      JSON.stringify({ ...errors, type: PLAY_GAME, success: false })
    );

  const playGame = JSON.stringify({
    type: HYDRATE_SELECT,
    room_id: gameState.room_id,
    selected_cards: gameState.selected_cards,
  });
  logTrace(`sending message to client, play game: ${playGame}`) 
  return ws.send(playGame);
};
