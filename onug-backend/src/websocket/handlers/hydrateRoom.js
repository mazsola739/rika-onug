import { HYDRATE_ROOM, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { upsertRoomData_ } from '../../repository'
import { getPlayerNames } from '../../utils'
import { validateRoom_ } from '../../validators'

export const hydrateRoom = async (ws, message) => {
  try {
    const { room_id } = message
    const [validity, config, players, errors] = await validateRoom_(room_id)

    if (!validity) return ws.send(JSON.stringify({ type: HYDRATE_ROOM, success: false, errors_: errors }))

    const newConfig = { ...config, stage: STAGES.ROOM }

    await upsertRoomData_(room_id, 'config', newConfig)
    await upsertRoomData_(room_id, 'players', players) // Ensure players are updated

    const hydrateRoom = JSON.stringify({
      type: HYDRATE_ROOM,
      success: true,
      room_id: newConfig.room_id,
      selected_cards: newConfig.selected_cards,
      selected_expansions: newConfig.selected_expansions,
      players: getPlayerNames(players.players) // Use updated players
    })

    logTrace(`sending message to client, hydrate room`, hydrateRoom)

    return ws.send(hydrateRoom)
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: HYDRATE_ROOM,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
