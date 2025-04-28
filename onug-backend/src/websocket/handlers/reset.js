import { EXPANSIONS, HYDRATE_ROOM } from '../../constants'
import { logError, logTrace } from '../../log'
import { upsertGamestate_ } from '../../repository'
import { getPlayerNames_ } from '../../utils'
import { validateRoom_ } from '../../validators'
import { broadcast } from '../../utils/connections.utils'

export const reset = async message => {
  try {
    const { room_id } = message
    const [validity, config, players, errors] = await validateRoom_(room_id)

    if (!validity) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors_: errors })

    const newConfig = {
      ...config,
      selected_cards: [],
      selected_expansions: EXPANSIONS
    }

    await upsertGamestate_(room_id, "config", config)

    logTrace(`selectedCards reseted, new config: ${JSON.stringify(newConfig)}`)

    const playersInGame = getPlayerNames_(players.players)

    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: true,
      selected_cards: newConfig.selected_cards,
      selected_expansions: newConfig.selected_expansions,
      players: playersInGame,
      nicknames: newConfig.nicknames
    })
  } catch (error) {
    logError(error)
  }
}
