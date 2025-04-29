import { HYDRATE_ROOM, STAGES } from '../../constants'
import { logErrorWithStack, logTrace } from '../../log'
import { upsertRoomState_ } from '../../repository'
import { validateRoom_ } from '../../validators'

export const hydrateRoom = async (ws, message) => {
  try {
    const { room_id } = message
    const { validity, roomState, players, errors } = await validateRoom_(room_id)

    if (!validity) {
      return ws.send(
        JSON.stringify({
          type: HYDRATE_ROOM,
          success: false,
          errors_: errors
        })
      )
    }

    const newState = { ...roomState, stage: STAGES.ROOM }

    await upsertRoomState_(room_id, 'roomState', newState)
    await upsertRoomState_(room_id, 'players', players)

    const extractPlayerNames = (playersObj) => {
      return Object.values(playersObj).map(player => {
        return {
          player_name: player.name
        }
      })
    }

    const newUpdatedPlayers = extractPlayerNames(players.players)

    const hydrateRoomMessage = JSON.stringify({
      type: HYDRATE_ROOM,
      success: true,
      room_id: newState.room_id,
      selected_cards: newState.selected_cards,
      selected_expansions: newState.selected_expansions,
      players: newUpdatedPlayers
    })

    logTrace(`sending message to client, hydrate room`, hydrateRoomMessage)

    ws.send(hydrateRoomMessage)
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
