import { HYDRATE_READY } from '../../constants'
import { logDebug, logError } from '../../log'
import { upsertRoomState_ } from '../../repository'
import { getPublicPlayersInformation } from '../../utils'
import { broadcast } from '../../utils/connections.utils'
import { validateRoom_ } from '../../validators'

export const hydrateReady = async (ws, message) => {
  logDebug(`ready/not ready requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  try {

    const { validity, players, errors } = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: HYDRATE_READY, success: false, errors }))

    const newPlayers = {
      ...players
    }
    newPlayers.players[token].flag = !newPlayers.players[token].flag

    logDebug(`gamestate.players[token].flag: ${newPlayers.players[token].flag}`)

    const playersPublicInformations = getPublicPlayersInformation(newPlayers)


    await upsertRoomState_(room_id, "players", newPlayers)


    return broadcast(room_id, { type: HYDRATE_READY, players: playersPublicInformations })
  } catch (error) {
    logError(error)
  }
}
