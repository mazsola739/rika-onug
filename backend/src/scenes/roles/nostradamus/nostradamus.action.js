import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const nostradamusAction = (gamestate, token, title) => {
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards, token)
  const selectable_card_limit = { player: 3, center: 0 }
  const scene_end = selectable_cards.length === 0

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    scene_end
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectable_cards.length < 3 ? 'action_no_selectable_player' : 'action_must_three_any'],
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end
  })
}
