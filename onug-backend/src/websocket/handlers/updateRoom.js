import { validateRoom } from '../../validators'
import { broadcast } from '../../utils/connections.utils'
import { HYDRATE_ROOM } from '../../constants'
import { upsertRoomState } from '../../repository'
import { determineTotalPlayers, filterCardsByExpansions, getPlayerNames, toggleCardSelect, toggleExpansions } from '../../utils'

//TODO repository => config

export const updateRoom = async message => {
  const { room_id, card_id, expansion } = message
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors })

  let totalPlayers = determineTotalPlayers(gamestate.selected_cards.length, gamestate.selected_cards)
  // TODO validate if player is admin
  if (expansion) {
    gamestate.selected_expansions = toggleExpansions(gamestate.selected_expansions, expansion)
    gamestate.selected_cards = filterCardsByExpansions(gamestate.selected_cards, gamestate.selected_expansions)
  }

  if (card_id) {
    gamestate.selected_cards = toggleCardSelect(gamestate.selected_cards, gamestate.selected_expansions, card_id, totalPlayers)
  }

  totalPlayers = determineTotalPlayers(gamestate.selected_cards.length, gamestate.selected_cards)

  if (totalPlayers > 12)
    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: false,
      errors: ['Cannot have more than 12 players.']
    })

  const players = getPlayerNames(gamestate)

  upsertRoomState(gamestate)

  return broadcast(room_id, {
    type: HYDRATE_ROOM,
    success: true,
    selected_cards: gamestate.selected_cards,
    selected_expansions: gamestate.selected_expansions,
    players
  })
}
