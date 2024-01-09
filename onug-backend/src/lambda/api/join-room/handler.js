const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const SECRET_KEY = uuidv4();
const roomsData = require("../../../data/rooms.json");
const {
  generateSuccessResponse,
  generateErrorResponse,
} = require("../../../util/response-generator");
const { randomPlayerName } = require("../../common/name-generator");
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

  let playerName;
  if (!roomIdValid) {
    if (room.available_names.length === 0) {
      return generateErrorResponse({ message: "No more available names. Room is full." });
    }
    playerName = randomPlayerName(room.available_names);

    const newRoomState = {
      room_id: room_id,
      room_name: room.room_name,
      selected_cards: room.selected_cards,
      actions: [],
      action_log: [],
      players: [{ name: playerName, admin: true }],
      turn: 0,
      closed: false,
      available_names: room.available_names.filter(name => name !== playerName),
    };

    await upsertRoomState(newRoomState);
  } else {
    if (room.available_names.length === 0) {
      return generateErrorResponse({ message: "No more available names. Room is full." });
    }

    playerName = randomPlayerName(gameState.available_names);

    gameState.players.push({
      name: playerName,
      admin: gameState.players.length === 0,
    });

    gameState.available_names = gameState.available_names.filter(name => name !== playerName);

    await upsertRoomState(gameState);
  }

  const playerToken = jwt.sign({ player_id: playerName, room_id: room_id }, SECRET_KEY, { expiresIn: '1h' });

  const response = generateSuccessResponse({
    success: true,
    message: "Successfully joined",
    room_id,
    player_id: playerName,
  });

  response.headers = {
    'Set-Cookie': `playerToken=${playerToken}; HttpOnly; Path=/; Max-Age=3600`,
    ...response.headers,
  };

  return response;
};

module.exports = {
  joinRoomController,
};
