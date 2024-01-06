const roomsData = require("../../../data/rooms.json");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../../../util/response-generator");
const validator = require("../../common/validator");
const { validateRoom } = validator;
const { repository } = require("../../repository");
const { upsertRoomState } = repository;

const joinRoomController = async (event) => {
  console.log(`Join-room endpoint triggered with event: ${JSON.stringify(event)}`);

  const { room_id } = event.body;
  const roomIndex = roomsData.findIndex((room) => room.room_id === room_id);
  
  if (roomIndex === -1) {
    return generateErrorResponse({ message: "Room does not exist." });
  }

  const room = roomsData[roomIndex];
  const [roomIdValid, gameState] = await validateRoom(room_id);

  if (!roomIdValid) {
    if (room.availableNames.length === 0) {
      return generateErrorResponse({ message: "No more available names. Room is full." });
    }
    
    room.availableNames.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));
    const initialPlayerName = room.availableNames.shift();

    const newRoomState = {
      room_id: room_id,
      room_name: room.room_name,
      selected_cards: room.selected_cards,
      actions: [],
      action_log: [],
      players: [{ name: initialPlayerName, admin: true }],
      turn: 0,
      closed: false,
      availableNames: room.availableNames,
    };

    await upsertRoomState(newRoomState);

    return generateSuccessResponse({
      success: true,
      message: "New room created and joined",
      room_id,
      player_id: initialPlayerName,
    });
  }

  if (room.availableNames.length === 0) {
    return generateErrorResponse({ message: "No more available names. Room is full." });
  }

  gameState.availableNames.sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));

  const nextAvailableName = gameState.availableNames.shift();
  
  gameState.players.push({
    name: nextAvailableName,
    admin: gameState.players.length === 0,
  });

  await upsertRoomState(gameState);

  return generateSuccessResponse({
    success: true,
    message: "Successfully joined",
    room_id,
    player_id: nextAvailableName,
  });
};

module.exports = {
  joinRoomController,
};
