import { HYDRATE_ROOM } from '../constants'
import { logTrace } from '../log'
import { validateRoom } from '../validator'

export const hydrateRoom = async (ws, message) => {
  const { room_id } = message
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return ws.send(JSON.stringify({ type: HYDRATE_ROOM, success: false, errors }))

  const hydrateRoom = JSON.stringify({
    type: HYDRATE_ROOM,
    success: true,
    room_id: gamestate.room_id,
    selected_cards: gamestate.selected_cards,
    selected_expansions: gamestate.selected_expansions,
  })
  
  logTrace(`sending message to client, hydrate room`, hydrateRoom)

  return ws.send(hydrateRoom)
}
