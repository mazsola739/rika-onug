import { HYDRATE_READY } from '../../constants'
import { logDebug, logError } from '../../log'
import { readGamestate, upsertRoomState } from '../../repository'
import { getPublicPlayersInformation } from '../../utils'
import { broadcast } from '../../utils/connections.utils'

export const hydrateReady = async message => {
      logDebug(`ready/not ready requested with ${JSON.stringify(message)}`)

    const { room_id, token } = message
  try {

    const gamestate = await readGamestate(room_id)
    // TODO validate client request

    gamestate.players[token].flag = !gamestate.players[token].flag

    logDebug(`gamestate.players[token].flag: ${gamestate.players[token].flag}`)

    const players = getPublicPlayersInformation(gamestate)

    await upsertRoomState(gamestate)

    return broadcast(room_id, { type: HYDRATE_READY, players })
  } catch (error) {
    logError(error)
  }
}
