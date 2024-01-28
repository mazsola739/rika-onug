const { PLAY_GAME } = require("../constant/ws");
const { logTrace } = require("../log");
const { validateRoom } = require("../validator");
const { repository } = require("../repository");
const { STAGES } = require("../constant/stage");
const { distributeCards } = require("../utils/card");
const { broadcastPlayGame } = require("./connections");
const { upsertRoomState } = repository;

exports.playGame = async (ws, message) => {
  const { room_id, token } = message;
  logTrace(`Game started in room: ${room_id}`);
  const [roomIdValid, gameState, errors] = await validateRoom(room_id);

  if (!roomIdValid)
    return ws.send(JSON.stringify({ type: PLAY_GAME, success: false, errors }));

  const player = gameState.players[token];

  const {
    playerCards,
    leftCard,
    middleCard,
    rightCard,
    newWolfCard,
    newVillainCard,
  } = dealCardIds(selectedCards); //todo check

  const newRoomState = {
    ...gameState,
    stage: STAGES.GAME_TABLE,
    card_positions: {
      center_left_card: leftCard,
      center_middle_car: middleCard,
      center_right_card: rightCard,
      center_wolf_card: newWolfCard,
      center_villain_card: newVillainCard,
    },
  };
  const playerTokens = Object.keys(gameState.players);

  playerTokens.forEach((token, index) => {
    newRoomState.players[token] = {
      ...gameState.players[token],
      player_card: playerCards[index],
      player_number: index + 1,
    };
  });

  // TODO validate player
  await upsertRoomState(newRoomState);

  return broadcastPlayGame(newRoomState);
};
