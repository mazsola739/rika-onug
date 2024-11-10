import { HYDRATE_ROOM, STAGES } from '../constants'
import { logErrorWithStack, logTrace } from '../log'
import { getPlayerNames } from '../utils'
import { validateRoom } from '../validators'

export const hydrateRoom = async (ws, message) => {
  try {
    const { room_id } = message
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) {
      return ws.send(JSON.stringify({ type: HYDRATE_ROOM, success: false, errors }))
    }
    const newGamestate = {...gamestate, stage: STAGES.ROOM}

    const players = getPlayerNames(newGamestate)

    const hydrateRoom = JSON.stringify({
      type: HYDRATE_ROOM,
      success: true,
      room_id: newGamestate.room_id,
      selected_cards: newGamestate.selected_cards,
      selected_expansions: newGamestate.selected_expansions,
      players
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
