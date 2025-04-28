import { validateRoom_ } from '../../validators'
import { broadcast } from '../../utils/connections.utils'
import { HYDRATE_ROOM } from '../../constants'
import { upsertGamestate_ } from '../../repository'
import { determineTotalPlayers, filterCardsByExpansions, getPlayerNames_, toggleCardSelect, toggleExpansions } from '../../utils'

export const updateRoom = async message => {
  const { room_id, card_id, expansion } = message
  const [validity, config, players, errors] = await validateRoom_(room_id)

  if (!validity) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors_: errors })

  let totalPlayers = determineTotalPlayers(config.selected_cards.length, config.selected_cards)
  let total_players = config.total_players || 0

  // TODO validate if player is admin
  if (expansion) {
    config.selected_expansions = toggleExpansions(config.selected_expansions, expansion)
    config.selected_cards = filterCardsByExpansions(config.selected_cards, config.selected_expansions)
  }

  if (card_id) {
    config.selected_cards = toggleCardSelect(config.selected_cards, config.selected_expansions, card_id, total_players)
  }

  totalPlayers = determineTotalPlayers(config.selected_cards.length, config.selected_cards)

  if (totalPlayers > 12)
    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: false,
      errors: ['Cannot have more than 12 players.']
    })

  const playersInGame = getPlayerNames_(players.players)
  const nicknames = config.nicknames || {}

  upsertGamestate_(room_id, "config", config)

  return broadcast(room_id, {
    type: HYDRATE_ROOM,
    success: true,
    selected_cards: config.selected_cards,
    selected_expansions: config.selected_expansions,
    players: playersInGame,
    nicknames
  })
}
