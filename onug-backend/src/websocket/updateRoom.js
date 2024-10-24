import { validateRoom } from '../validators'
import { determineTotalPlayers, filterCardsByExpansions, getPlayerNames, toggleCardSelect, toggleExpansions } from '../utils'
import { upsertRoomState } from '../repository'
import { HYDRATE_ROOM } from '../constants'
import { broadcast } from './connections'

export const updateRoom = async (message) => {
  const { room_id, card_id, expansion } = message
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors })
  const newGamestate = { ...gamestate }
  let totalPlayers = determineTotalPlayers(newGamestate.selected_cards.length, newGamestate.selected_cards)
  // TODO validate if player is admin
  if (expansion) {
    newGamestate.selected_expansions = toggleExpansions(newGamestate.selected_expansions, expansion)
    newGamestate.selected_cards = filterCardsByExpansions(newGamestate.selected_cards, newGamestate.selected_expansions)
  }
 
  if (card_id) {
    newGamestate.selected_cards = toggleCardSelect(newGamestate.selected_cards, newGamestate.selected_expansions, card_id, totalPlayers)
  }

  totalPlayers = determineTotalPlayers(newGamestate.selected_cards.length, newGamestate.selected_cards)

  if (totalPlayers > 12) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors: ['Cannot have more than 12 players.'] })

  const players = getPlayerNames(newGamestate)

  upsertRoomState(newGamestate)
  
  return broadcast(room_id, { type: HYDRATE_ROOM, success: true, selected_cards: newGamestate.selected_cards, selected_expansions: newGamestate.selected_expansions, players })
}
