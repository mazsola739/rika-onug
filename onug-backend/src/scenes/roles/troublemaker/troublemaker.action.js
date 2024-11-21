import { generateRoleAction, getSelectableOtherPlayerNumbersWithNoShield } from '../../sceneUtils'

export const troublemakerAction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(gamestate.players, token)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 2, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length >= 2 ? 'action_may_two_any_other' : 'action_no_selectable_player'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers.length >= 2 ? selectablePlayerNumbers : [],
      selectable_card_limit: {
        player: selectablePlayerNumbers.length >= 2 ? 2 : 0,
        center: 0
      }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
