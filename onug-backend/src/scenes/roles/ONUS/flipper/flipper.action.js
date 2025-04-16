import { generateRoleAction, getSelectableOtherPlayerNumbersWithNoShield } from '../../../sceneUtils'

export const flipperAction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(gamestate.players, token)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : 'action_may_one_any_other'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
