import { HYDRATE_READY } from '../constants'
import { logDebug, logError } from '../log'
import { readGamestate, upsertRoomState } from '../repository'
import { getTableBoard } from '../utils'
import { broadcast } from './connections'

export const ready = async (message) => {
  try {
    logDebug(`ready/not ready requested with ${JSON.stringify(message)}`)
    
    const { room_id, token } = message
    const gamestate = await readGamestate(room_id)
    const newGamestate = {
      ...gamestate,
    }
    // TODO validate client request

    newGamestate.players[token].ready = !gamestate.players[token].ready

    logDebug(`gamestate.players[token].ready: ${gamestate.players[token].ready}`)

    const players = getTableBoard(newGamestate)

    await upsertRoomState(newGamestate)

    return broadcast(room_id, {
      type: HYDRATE_READY,
      players
    })
  } catch (error) {
    logError(error)
  }
}
