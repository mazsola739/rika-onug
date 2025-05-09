import { validateRoom } from '../../validators'
import { broadcast } from '../../utils/connections.utils'
import { HYDRATE_ROOM } from '../../constants'
import { repo, repositoryType } from '../../repository'
import { determineTotalPlayers, filterCardsByExpansions, getPlayerNames, toggleCardSelect, toggleExpansions } from '../../utils'
import { logTrace } from '../../log'

export const updateRoom = async message => {
  logTrace(`update-room requested with ${JSON.stringify(message)}`)
  const { room_id, card_id, expansion } = message
  const [validity, gamestate, errors] = await validateRoom(room_id)

  if (!validity) return broadcast(room_id, { type: HYDRATE_ROOM, success: false, errors })

  let newGamestate = { ...gamestate }
  let total_players = newGamestate.total_players || 0

  // TODO validate if player is admin
  if (expansion) {
    newGamestate.selected_expansions = toggleExpansions(newGamestate.selected_expansions, expansion)
    newGamestate.selected_cards = filterCardsByExpansions(newGamestate.selected_cards, newGamestate.selected_expansions)
  }

  if (card_id) {
    const hasAlphawolf = newGamestate.selected_cards.includes(17)
    const hasTemptress = newGamestate.selected_cards.includes(69) 

    const totalPlayers = determineTotalPlayers(newGamestate.selected_cards.length, hasAlphawolf, hasTemptress)

    if (totalPlayers >= 12 && !newGamestate.selected_cards.includes(card_id)) {
      return broadcast(room_id, {
        type: HYDRATE_ROOM,
        success: false,
        errors: ['Cannot select more cards. Maximum players reached.']
      })
    }

    newGamestate.selected_cards = toggleCardSelect(newGamestate.selected_cards, newGamestate.selected_expansions, card_id, totalPlayers)
  }

  if (total_players > 12)
    return broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: false,
      errors: ['Cannot have more than 12 players.']
    })

  const playersInGame = getPlayerNames(newGamestate.players) //TODO save into gamestate as publicinformation?

  await repo[repositoryType].upsertRoomState(newGamestate)

  return broadcast(room_id, {
    type: HYDRATE_ROOM,
    success: true,
    selected_cards: newGamestate.selected_cards,
    selected_expansions: newGamestate.selected_expansions,
    players: playersInGame
  })
}
