import { HYDRATE_READY } from '../../constants'
import { logDebug, logError } from '../../log'
import { repo, repositoryType } from '../../repository'
import { getPublicPlayersInformation } from '../../utils'
import { broadcast, sendMessage } from '../../utils/connections.utils'
import { validateRoom } from '../../validators'

export const hydrateReady = async (ws, message) => {
  logDebug(`ready/not ready requested with ${JSON.stringify(message)}`)

  const { room_id, token } = message
  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: HYDRATE_READY, success: false, errors })

    const newGamestate = {
      ...gamestate
    }
    newGamestate.players[token].flag = !newGamestate.players[token].flag

    logDebug(`gamestate.players[token].flag: ${newGamestate.players[token].flag}`)

    const playersPublicInformations = getPublicPlayersInformation(newGamestate.players)

    await repo[repositoryType].upsertRoomState(newGamestate)

    return broadcast(room_id, { type: HYDRATE_READY, players: playersPublicInformations }) //TODO save into gamestate as publicinformation?
  } catch (error) {
    logError(error)
  }
}
