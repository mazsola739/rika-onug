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
    const player = playersByToken[token]
    const playerCard = player.card

    return ws.send(
      JSON.stringify({
        type: HYDRATE_GAME_TABLE,
        selected_cards: gameState.selected_cards,
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
        board: getGameTableBoard(gameState)
      })
    )
  } catch (error) { 
    logErrorWithStack(error)
  }
}
