import { EXPANSIONS, HYDRATE_ROOM } from '../../constants'
import { logError, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { getPlayerNames } from '../../utils'
import { validateRoom } from '../../validators'
import { broadcast } from '../../utils/connections.utils'

export const reset = async message => {
  try {
    const { room_id } = message
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors_: errors })

    const newGamestate = {
      ...gamestate,
      selected_cards: [],
      selected_expansions: EXPANSIONS
    }

    await repo[repositoryType].upsertRoomState(newGamestate)

    logTrace(`selectedCards reseted, new gamestate: ${JSON.stringify(newGamestate)}`)

    const playersInGame = getPlayerNames(newGamestate.players)

    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: true,
      selected_cards: newGamestate.selected_cards,
      selected_expansions: newGamestate.selected_expansions,
      players: playersInGame
    })
  } catch (error) {
    logError(error)
  }
}
