const { HYDRATE_GAME_TABLE, REDIRECT } = require("../constant/ws")
const { logTrace, logErrorWithStack} = require("../log")
const { repository } = require('../repository')
const { isGameTableClosed, getGameTableBoard } = require("../utils")
const { readGameState } = repository

exports.hydrateGameTable = async (ws, message) => {
  try {
    logTrace(`hydrate game table requested with ${JSON.stringify(message)}`)
    const { room_id, token } = message
    const gameState = await readGameState(room_id)

    if (isGameTableClosed(gameState)) return ws.send(JSON.stringify({ type: REDIRECT, path: `/room/${room_id}`  }))

    const playersByToken = gameState.players

    return ws.send(
      JSON.stringify({
        type: HYDRATE_GAME_TABLE,
        player_name: playersByToken[token]?.name,
        player_card_id: playersByToken[token]?.card?.id,
        player_role: playersByToken[token]?.card?.role,
        player_role_id: playersByToken[token]?.card?.role_id,
        player_team: playersByToken[token]?.card?.team,
        player_number: playersByToken[token]?.player_number,
        board: getGameTableBoard(gameState)
      })
    )
  } catch (error) { 
    logErrorWithStack(error)
  }
}
