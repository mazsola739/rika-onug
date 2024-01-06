const path = require("path");
const fs = require("fs");
const filePath = path.join(__dirname, "../../../data/rooms.json");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../../../util/response-generator");
const validator = require("../../common/validator");
const { validateRoom } = validator;
const { repository } = require("../../repository");

const { upsertRoomState } = repository;

const names = [
  "Player 1",
  "Player 2",
  "Player 3",
  "Player 4",
  "Player 5",
  "Player 6",
  "Player 7",
  "Player 8",
  "Player 9",
  "Player 10",
  "Player 11",
  "Player 12",
];

let nextAvailableNameIndex = 0;

const joinRoomController = async (event) => {
  console.log(
    `Join-room endpoint triggered with event: ${JSON.stringify(event)}`
  );

  const { room_id, player_name } = event.body;

  const roomsData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const roomIndex = roomsData.findIndex((room) => room.room_id === room_id);

  if (roomIndex === -1) {
    const roomDataFromJson = roomsData.find((room) => room.room_id === room_id);
    
    if (roomDataFromJson) {
      roomsData.push({
        ...roomDataFromJson,
        players: [{ name: player_name, admin: true }],
      });

      fs.writeFileSync(filePath, JSON.stringify(roomsData, null, 2), 'utf8');
      
      return generateSuccessResponse({
        message: "New room created and joined",
        room_id,
      });
    } else {
      return generateErrorResponse({
        message: "Room data not found in configuration.",
      });
    }
  }

  const room = roomsData[roomIndex];

  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid) {
    generateErrorResponse(errors);

    await upsertRoomState({
      room_id: room_id,
      room_name: room.room_name, 
      selected_cards: room.selected_cards,
      actions: [],
      action_log: [],
      players: [],
      turn: 0,
      closed: false,
    });

    return generateSuccessResponse({
      message: "Room created in gameState and joined",
      room_id,
    });
  }

  const playerId = names[nextAvailableNameIndex];
  nextAvailableNameIndex = (nextAvailableNameIndex + 1) % names.length;

  const nextPlayerNumber = gameState.players.length + 1;

  const newGameState = { ...gameState };
  newGameState.players.push({
    name: playerId,
    admin: nextPlayerNumber === 1,
  });

  await upsertRoomState(newGameState);

  return generateSuccessResponse({
    message: "Successfully joined",
    room_id,
    player_id: player_name,
  });
};

module.exports = {
  joinRoomController,
};
