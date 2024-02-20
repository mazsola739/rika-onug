import { HYDRATE_ROOM } from '../constant/ws';
import { logTrace } from '../log';
import { validateRoom } from '../validator';
import { upsertRoomState } from '../repository';
import { broadcast } from './connections'

export const reset = async (message) => {
  try {
    const { room_id } = message
    const [roomIdValid, gameState, errors] = await validateRoom(room_id)

    if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors })

    const newGameState = { ...gameState, selected_cards: [] }

    upsertRoomState(newGameState)

    logTrace(`selectedCards reseted, new game state: ${JSON.stringify(newGameState)}`)

    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: true,
      selected_cards: [],
    })
  } catch (error) {
    logError(error)
  }
};
