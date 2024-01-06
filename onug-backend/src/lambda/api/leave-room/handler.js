const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../../../util/response-generator");
const validator = require("../../common/validator");
const { repository } = require("../../repository");

const { validateRoom } = validator;
const { upsertRoomState } = repository;

const leaveRoomController = async (event) => {
  console.log(
    `Leave-room endpoint triggered with event: ${JSON.stringify(event)}`
  );

  const { room_id, player_name } = event.body;

  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid) {
    return generateErrorResponse(errors); 
  }

  const playerIndex = gameState.players.findIndex(player => player.name === player_name);

  if (playerIndex === -1) {
    return generateErrorResponse({ message: 'Player not found in the room.' });
  }

  if (gameState.players[playerIndex].admin) {
    if (gameState.players.length > 1) {
      gameState.players[1].admin = true;
    }
  }

  gameState.players.splice(playerIndex, 1);

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
