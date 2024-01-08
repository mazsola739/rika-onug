const roomsData = require("../../../data/rooms.json");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../../../util/response-generator");
const validator = require("../../common/validator");
const { validateRoom } = validator;
const { repository } = require("../../repository");
const { upsertRoomState } = repository;

const leaveRoomController = async (event) => {
  const { room_id, player_name } = event.body;

  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid) {
    return generateErrorResponse(errors); 
  }

  const playerIndex = gameState.players.findIndex(player => player.name === player_name);

  if (playerIndex === -1) {
    return generateErrorResponse({ message: 'Player not found in the room.' });
  }

  if (gameState.players[playerIndex].admin && gameState.players.length > 1) {
    gameState.players[1].admin = true;
  }

  const removedPlayer = gameState.players.splice(playerIndex, 1)[0];

  gameState.available_names.push(removedPlayer.name);

  if (gameState.players.length === 0) {
    const defaultRoom = roomsData.find(room => room.room_id === room_id);
    if (defaultRoom) {
      gameState.selected_cards = defaultRoom.selected_cards;
      gameState.actions = [];
      gameState.action_log = [];
      gameState.players = [];
      gameState.turn = 0;
      gameState.closed = false;
      gameState.available_names = [...defaultRoom.available_names];
    }
  }

  await upsertRoomState(gameState);

  return generateSuccessResponse({
    success: true,
    message: "Successfully left the room",
    room_id,
    player_id: player_name,
  });
};

module.exports = {
  leaveRoomController,
};
