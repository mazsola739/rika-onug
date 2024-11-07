import { HYDRATE_ROOM } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const reset = async message => {
  try {
    const { room_id } = message
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors })

    const newGamestate = {
      ...gamestate,
      selected_cards: [],
      selected_expansions: ['Werewolf', 'Daybreak', 'Vampire', 'Alien', 'Super Villains', 'Bonus Roles']
    }

    upsertRoomState(newGamestate)

    logTrace(`selectedCards reseted, new gamestate: ${JSON.stringify(newGamestate)}`)

    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: true,
      selected_cards: [],
      selected_expansions: ['Werewolf', 'Daybreak', 'Vampire', 'Alien', 'Super Villains', 'Bonus Roles']
    })
  } catch (error) {
    logError(error)
  }
}
