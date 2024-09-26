import { validateRoom } from '../validator'
import { determineTotalPlayers, filterCardsByExpansions, toggleCardSelect, toggleExpansions } from '../utils'
import { upsertRoomState } from '../repository'
import { HYDRATE_ROOM } from '../constant'
import { broadcast } from './connections'

export const updateRoom = async (message) => {
  const { room_id, card_id, expansion, token } = message
  const [roomIdValid, gameState, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors })
  const newGameState = { ...gameState }
  let totalPlayers = determineTotalPlayers(newGameState.selected_cards.length, newGameState.selected_cards)
  // TODO validate if player is admin
  if (expansion) {
    newGameState.selected_expansions = toggleExpansions(newGameState.selected_expansions, expansion)
    newGameState.selected_cards = filterCardsByExpansions(newGameState.selected_cards, newGameState.selected_expansions)
  }
 
  if (card_id) {
    newGameState.selected_cards = toggleCardSelect(newGameState.selected_cards, newGameState.selected_expansions, card_id, totalPlayers)
  }

  totalPlayers = determineTotalPlayers(newGameState.selected_cards.length, newGameState.selected_cards)

  if (totalPlayers > 12) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors: ["Cannot have more than 12 players."] })

  upsertRoomState(newGameState)
  
  return broadcast(room_id, { type: HYDRATE_ROOM, success: true, selected_cards: newGameState.selected_cards, selected_expansions: newGameState.selected_expansions })
}
