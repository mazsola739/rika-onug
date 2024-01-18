const { JOIN_ROOM } = require("../constant/ws");
const roomsData = require("../data/rooms.json");
const { randomPlayerName } = require("../utils/name-generator");
const validator = require("../validator");
const { validateRoom } = validator;
const { repository } = require("../repository");
const { upsertRoomState } = repository;
const { logTrace } = require("../log");
const { STAGES } = require("../constant/stage");
const { addUserToRoom } = require("./connections");

exports.joinRoom = async (ws, message) => {
  logTrace(`join-room requested with ${JSON.stringify(message)}`);
  const { room_id, token } = message;

  const roomIndex = roomsData.findIndex((room) => room.room_id === room_id);

  if (roomIndex === -1) {
    return ws.send(
      JSON.stringify({
        type: JOIN_ROOM,
        success: false,
        errors: ["Room does not exist."],
      })
    );
  }

  const room = roomsData[roomIndex];
  const [roomIdValid, gameState] = await validateRoom(room_id);

  let player_name;

  if (!roomIdValid) {
    if (room.available_names.length === 0) {
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          succes: false,
          errors: ["No more available names. Room is full."],
        })
      );
    }
    player_name = randomPlayerName(room.available_names);

    const newRoomState = {
      room_id,
      room_name: room.room_name,
      selected_cards: room.selected_cards,
      actions: [],
      action_log: [],
      players: {
        [token]: { name: player_name, admin: true, stage: STAGES.room },
      },
      turn: 0,
      closed: false,
      available_names: room.available_names.filter(
        (name) => name !== player_name
      ),
    };

    await upsertRoomState(newRoomState);
  } else {
    if (room.available_names.length === 0) {
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          succes: false,
          errors: ["No more available names. Room is full."],
        })
      );
    }

    player_name = randomPlayerName(gameState.available_names);

    gameState.players[token] = {
      name: player_name,
      admin: gameState.players.length === 0,
      stage: STAGES.room,
    };

    gameState.available_names = gameState.available_names.filter(
      (name) => name !== player_name
    );

    await upsertRoomState(gameState);
  }

  addUserToRoom(ws, token, room_id)

  return ws.send(
    JSON.stringify({
      type: JOIN_ROOM,
      success: true,
      message: "Successfully joined",
      room_id,
      player_name,
    })
  );
};
