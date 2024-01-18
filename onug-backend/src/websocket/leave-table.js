const roomsData = require("../data/rooms.json");
const { repository } = require("../repository");
const { upsertRoomState, readGameState } = repository;
const { logTrace } = require("../log");
const { LEAVE_TABLE } = require("../constant/ws");
const { removeUserFromRoom, broadcast } = require("./connections");
const { STAGES } = require("../constant/stage");

exports.leaveTable = async (ws, message) => {
  logTrace(`leave-table requested with ${JSON.stringify(message)}`);

  const { room_id, token } = message;
  const gameState = await readGameState(room_id);

  const player = gameState.players[token];

  if (!player) {
    return ws.send(
      JSON.stringify({
        type: LEAVE_TABLE,
        success: false,
        errors: ["Player not found at the table."],
      })
    );
  }

  const newGameState = {
    ...gameState,
  };
  delete newGameState.center_cards
  const playerTokens = Object.keys(newGameState.players);
  playerTokens.forEach((token, index) => {
    newGameState.players[token] = {
      ...newGameState.players[token],
      stage: STAGES.ROOM,
    };
    delete newGameState.players[token].player_card
    delete newGameState.players[token].player_number
  });


  await upsertRoomState(newGameState);

  removeUserFromRoom(token, room_id)
  
  return broadcast(room_id, { type: LEAVE_TABLE, success: true});
};
