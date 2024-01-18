const { HYDRATE_ROOM } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");

exports.hydrateRoom = async (ws, message) => {
  const { room_id } = message;
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(
      JSON.stringify({ type: HYDRATE_ROOM, success: false, errors })
    );

  const hydrateSelect = JSON.stringify({
    type: HYDRATE_ROOM,
    success: true,
    room_id: gameState.room_id,
    selected_cards: gameState.selected_cards,
  });
  logTrace(`sending message to client, hydrate select: ${hydrateSelect}`);
  return ws.send(hydrateSelect);
};
