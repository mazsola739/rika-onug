import { HYDRATE_READY } from '../constant'
import { logDebug, logError } from '../log'
import { readGameState, upsertRoomState } from '../repository'
import { getGameTableBoard } from '../utils'
import { broadcast } from './connections'

export const ready = async (message) => {
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
