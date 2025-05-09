import { generateRoleAction, getSelectableOtherPlayerNumbersWithNoShield } from '../../sceneUtils'

export const flipperAction = (gamestate, token, title) => {
  const selectable_cards = getSelectableOtherPlayerNumbersWithNoShield(gamestate.players, token)
  const selectable_card_limit = { player: 1, center: 0 }
  const scene_end = selectable_cards.length === 0

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    scene_end
  }

  return generateRoleAction(gamestate, token, {
    private_message: [scene_end ? 'action_no_selectable_player' : 'action_may_one_any_other'],
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end
  })
}
