import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const temptressAction = (gamestate, token, title) => {
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'nonVillainWithoutShield', gamestate.positions.shielded_cards)
  const selectable_card_limit = { player: 1, center: 0 }
  const scene_end = selectable_cards.length === 0

  return generateRoleAction(gamestate, token, title, {
    private_message: [scene_end ? 'action_no_selectable_player' : 'action_must_one_any_non_villain'],
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end,
    obligatory: true
  })
}
