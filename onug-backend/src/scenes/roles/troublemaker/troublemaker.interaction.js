import { generateRoleInteraction, getSelectableOtherPlayerNumbersWithNoShield } from '../../sceneUtils'

export const troublemakerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 2, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length >= 2 ? 'interaction_may_two_any_other' : 'interaction_no_selectable_player'],
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
