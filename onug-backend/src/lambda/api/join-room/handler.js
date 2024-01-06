const roomsData = require("../../../data/rooms.json");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../../../util/response-generator");
const validator = require("../../common/validator");
const { repository } = require("../../repository");

const { validateRoom } = validator;
const { upsertRoomState } = repository;

const availablePlayerNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
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

const getAvailableName = () => {
  if (nextAvailableNameIndex < names.length) {
    const playerName = names[nextAvailableNameIndex];
    nextAvailableNameIndex++;
    return playerName;
  }
  return null;
};

const joinRoomController = async (event) => {
  const { room_id } = event.body;
  const roomIndex = roomsData.findIndex((room) => room.room_id === room_id);

  if (roomIndex === -1) {
    const roomDataFromJson = roomsData.find((room) => room.room_id === room_id);
    if (roomDataFromJson) {
      const initialPlayerName = getAvailableName();
      if (!initialPlayerName) {
        return generateErrorResponse({
          message: "No available player names.",
        });
      }
      roomsData.push({
        ...roomDataFromJson,
        players: [{ name: initialPlayerName, admin: true }],
      });
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

  const playerId = getAvailableName();
  const newGameState = { ...gameState };
  newGameState.players.push({
    name: playerId,
    admin: newGameState.players.length === 0,
  });

  await upsertRoomState(newGameState);

  return generateSuccessResponse({
    success: true,
    message: "Successfully joined",
    room_id,
    player_id: playerId,
  });
};

module.exports = {
  joinRoomController,
};
