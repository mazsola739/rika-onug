const { HYDRATE_GAME_TABLE, REDIRECT } = require("../constant/ws");
const { logTrace } = require("../log");
const { repository } = require('../repository');
const { isGameTableClosed, getPlayersReadyState } = require("../utils");
const { readGameState } = repository

exports.hydrateGameTable = async (ws, message) => {
  logTrace(`hydrate game table requested with ${JSON.stringify(message)}`)
  const { room_id } = message;
  const gameState = await readGameState(room_id)

  if (isGameTableClosed(gameState)) return ws.send(
    JSON.stringify({ type: REDIRECT, path: `/room/${room_id}`  })
  );

  const {ready, notReady} = getPlayersReadyState(gameState)
 
  return ws.send(
    JSON.stringify({ type: HYDRATE_GAME_TABLE, ready, notReady })
  );
};
