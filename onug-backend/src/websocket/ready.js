const { HYDRATE_GAME_TABLE } = require("../constant/ws");
const { logTrace, logDebug } = require("../log");
const { repository } = require('../repository');
const { getPlayersReadyState } = require("../utils");
const { broadcast } = require("./connections");
const { readGameState, upsertRoomState } = repository

exports.ready = async (message) => {
  logDebug(`ready/not ready requested with ${JSON.stringify(message)}`)
  const { room_id, token } = message;
  const gameState = await readGameState(room_id)

  const newGameState = {
    ...gameState,
  }
  newGameState.players[token].ready = !gameState.players[token].ready

  logDebug(`gameState.players[token].ready: ${gameState.players[token].ready}`)
  await upsertRoomState(newGameState)
  const {ready, notReady} = getPlayersReadyState(newGameState)
 
  return broadcast(room_id, { type: HYDRATE_GAME_TABLE, ready, notReady })
};
