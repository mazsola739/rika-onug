import { HYDRATE_GUESS } from '../constants'
import { upsertRoomState } from '../repository'
import { validateRoom } from '../validators'
import { broadcast } from './connections'

export const hydrateGuess = async (message) => {
  const { room_id } = message
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_GUESS, success: false, errors })
  const newGamestate = { ...gamestate }

  newGamestate.guess_tokens = [...newGamestate.selected_cards]


/*   players: tokens.map((t) => ({
    player_number: players[t].player_number,
    player_name: players[t].name,
    flag: players[t].flag,
    guessed_roles: [],
  })), */

  upsertRoomState(newGamestate)
  
  return broadcast(room_id, { type: HYDRATE_GUESS, success: true, selected_cards: newGamestate.selected_cards, selected_expansions: newGamestate.selected_expansions })
}
