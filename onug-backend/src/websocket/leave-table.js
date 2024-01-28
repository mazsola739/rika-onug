const { repository } = require("../repository")
const { upsertRoomState, readGameState } = repository
const { logTrace } = require("../log")
const { LEAVE_TABLE, HYDRATE_GAME_TABLE, REDIRECT } = require("../constant/ws")
const { broadcast } = require("./connections")
const { STAGES } = require("../constant/stage")

exports.leaveTable = async (ws, message) => {
  logTrace(`leave-table requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  const gameState = await readGameState(room_id)

  const player = gameState.players[token]

  if (!player) {
    return ws.send(
      JSON.stringify({
        type: HYDRATE_GAME_TABLE,
        success: false,
        errors: ["Player not found at the table."],
      })
    )
  }

  const newGameState = {
    ...gameState,
    stage: STAGES.ROOM,
  }
  delete newGameState.card_positions
  const playerTokens = Object.keys(newGameState.players)
  playerTokens.forEach((token) => {
    newGameState.players[token] = {
      ...newGameState.players[token],
    }
    delete newGameState.players[token].player_start_card_id
    delete newGameState.players[token].card
    delete newGameState.players[token].player_number
    newGameState.players[token].ready = false
  })

  await upsertRoomState(newGameState)

  return broadcast(room_id, { type: REDIRECT, path: `/room/${room_id}` })
}
