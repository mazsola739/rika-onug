const { HYDRATE_GAME_TABLE, REDIRECT } = require("../constant/ws");
const { logTrace, logError } = require("../log");
const { repository } = require('../repository');
const { isGameTableClosed, getBoard } = require("../utils");
const { readGameState } = repository

exports.hydrateGameTable = async (ws, message) => {
  try {
    logTrace(`hydrate game table requested with ${JSON.stringify(message)}`)
    const { room_id, token } = message
    const gameState = await readGameState(room_id)

    if (isGameTableClosed(gameState)) return ws.send(
      JSON.stringify({ type: REDIRECT, path: `/room/${room_id}`  })
    );

    const playersByToken = gameState.players

    return ws.send(
      JSON.stringify({
        type: HYDRATE_GAME_TABLE,
        player_name: playersByToken[token]?.name,
        player_card_id: playersByToken[token]?.player_card, //TODO card_id
        player_number: playersByToken[token]?.player_number,
        board: getBoard(gameState)
      })
    );
  } catch (error) { 
    logError(error)
  }
};
