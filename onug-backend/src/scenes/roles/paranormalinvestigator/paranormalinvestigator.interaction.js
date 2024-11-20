import { generateRoleInteraction, getSelectableOtherPlayerNumbersWithNoShield } from '../../sceneUtils'

//TODO fix limit
export const paranormalinvestigatorInteraction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(gamestate.players, token)

  const limit = selectablePlayerNumbers.length === 1 ? 1 : 2

  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: limit, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : limit === 1 ? 'interaction_may_one_any_other' : 'interaction_may_two_any_other'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: limit, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
