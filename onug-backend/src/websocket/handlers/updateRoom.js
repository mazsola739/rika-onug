import { validateRoom_ } from '../../validators'
import { broadcast } from '../../utils/connections.utils'
import { HYDRATE_ROOM } from '../../constants'
import { upsertRoomState_ } from '../../repository'
import { filterCardsByExpansions, getPlayerNames, toggleCardSelect, toggleExpansions } from '../../utils'
import { logTrace } from '../../log'

export const updateRoom = async message => {
  logTrace(`update-room requested with ${JSON.stringify(message)}`)
  const { room_id, card_id, expansion } = message
  const { validity, roomState, players, errors } = await validateRoom_(room_id)

  if (!validity) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors_: errors })

  let total_players = roomState.total_players || 0

  // TODO validate if player is admin
  if (expansion) {
    roomState.selected_expansions = toggleExpansions(roomState.selected_expansions, expansion)
    roomState.selected_cards = filterCardsByExpansions(roomState.selected_cards, roomState.selected_expansions)
  }

  if (card_id) {
    roomState.selected_cards = toggleCardSelect(roomState.selected_cards, roomState.selected_expansions, card_id, total_players)
  }

  if (total_players > 12)
    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: false,
      errors: ['Cannot have more than 12 players.']
    })

  const playersInGame = getPlayerNames(players.players)

  upsertRoomState_(room_id, "roomState", roomState)

  return broadcast(room_id, {
    type: HYDRATE_ROOM,
    success: true,
    selected_cards: roomState.selected_cards,
    selected_expansions: roomState.selected_expansions,
    players: playersInGame
  })
}
