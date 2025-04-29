import { EXPANSIONS, HYDRATE_ROOM } from '../../constants'
import { logError, logTrace } from '../../log'
import { upsertRoomState_ } from '../../repository'
import { getPlayerNames } from '../../utils'
import { validateRoom_ } from '../../validators'
import { broadcast } from '../../utils/connections.utils'

export const reset = async message => {
  try {
    const { room_id } = message
    const { validity, roomState, players, errors } = await validateRoom_(room_id)

    if (!validity) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors_: errors })

    const newState = {
      ...roomState,
      selected_cards: [],
      selected_expansions: EXPANSIONS
    }

    await upsertRoomState_(room_id, "roomState", roomState)

    logTrace(`selectedCards reseted, new roomState: ${JSON.stringify(newState)}`)

    const playersInGame = getPlayerNames(players.players)

    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: true,
      selected_cards: newState.selected_cards,
      selected_expansions: newState.selected_expansions,
      players: playersInGame
    })
  } catch (error) {
    logError(error)
  }
}
