const { v4: uuidv4 } = require("uuid");
const roomsData = require("../data/rooms.json");
const { randomPlayerName } = require("../utils/name-generator");
const validator = require("../validator");
const { validateRoom } = validator;
const { repository } = require("../repository");
const { logTrace, logInfo } = require("../log");
const { upsertRoomState } = repository;

exports.joinRoom = async (req, res) => {
  const { body } = req;
  logTrace(
    `Join-room endpoint triggered with request body: ${JSON.stringify(body)}`
  );

  const { room_id } = body;
  const roomIndex = roomsData.findIndex((room) => room.room_id === room_id);

  if (roomIndex === -1) {
    return res.send({ message: "Room does not exist." });
  }

  const room = roomsData[roomIndex];
  const [roomIdValid, gameState] = await validateRoom(room_id);

  let player_name;
  const token = uuidv4();

  if (!roomIdValid) {
    if (room.available_names.length === 0) {
      return res.send({ message: "No more available names. Room is full." });
    }
    player_name = randomPlayerName(room.available_names);

    const newRoomState = {
      room_id,
      room_name: room.room_name,
      selected_cards: room.selected_cards,
      actions: [],
      action_log: [],
      players: [{ name: player_name, admin: true, token }],
      turn: 0,
      closed: false,
      available_names: room.available_names.filter(
        (name) => name !== player_name
      ),
    };

    await upsertRoomState(newRoomState);
  } else {
    if (room.available_names.length === 0) {
      return res.send({ message: "No more available names. Room is full." });
    }

    player_name = randomPlayerName(gameState.available_names);

    gameState.players.push({
      name: player_name,
      admin: gameState.players.length === 0,
      token,
    });

    gameState.available_names = gameState.available_names.filter(
      (name) => name !== player_name
    );

    await upsertRoomState(gameState);
  }

  return res.send({
    success: true,
    message: "Successfully joined",
    room_id,
    player_name,
    token,
  });
};
