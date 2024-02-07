const { HYDRATE_READY } = require("../constant/ws")
const { logDebug, logError } = require("../log")
const { repository } = require("../repository")
const { getGameTableBoard } = require("../utils")
const { broadcast } = require("./connections")
const { readGameState, upsertRoomState } = repository

exports.ready = async (message) => {
  try {
    logDebug(`ready/not ready requested with ${JSON.stringify(message)}`)
    
    const { room_id, token } = message
    const gameState = await readGameState(room_id)
    const newGameState = {
      ...gameState,
    }
    // TODO validate client request

    newGameState.players[token].ready = !gameState.players[token].ready

    logDebug(`gameState.players[token].ready: ${gameState.players[token].ready}`)

    const board = getGameTableBoard(newGameState)

    await upsertRoomState(newGameState)

    return broadcast(room_id, {
      type: HYDRATE_READY,
      board
    })
  } catch (error) {
    logError(error)
  }
}
