import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const temptressAction = (gamestate, token, title) => {
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'nonVillainWithoutShield', gamestate.positions.shielded_cards)
  const selectable_card_limit = { player: 1, center: 0 }
  const scene_end = selectable_cards.length === 0

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    scene_end,
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: [scene_end ? 'action_no_selectable_player' : 'action_must_one_any_non_villain'],
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end,
    obligatory: true
  })
}
