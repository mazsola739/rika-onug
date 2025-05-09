import { generateRoleAction, getSelectableOtherPlayerNumbersWithNoShield } from '../../sceneUtils'

//TODO fix limit
export const paranormalinvestigatorAction = (gamestate, token, title) => {
  const selectable_cards = getSelectableOtherPlayerNumbersWithNoShield(gamestate.players, token)
  const limit = selectable_cards.length === 1 ? 1 : 2
  const selectable_card_limit = { player: limit, center: 0 }
  const scene_end = selectable_cards.length === 0

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    scene_end
  }

  return generateRoleAction(gamestate, token, {
    private_message: [scene_end ? 'action_no_selectable_player' : limit === 1 ? 'action_may_one_any_other' : 'action_may_two_any_other'],
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end
  })
}
