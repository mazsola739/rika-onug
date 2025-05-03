import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../../sceneUtils'

export const temptressAction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersByGivenConditions(gamestate.players, 'nonVillainWithoutShield', gamestate.shielded_cards)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0,
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : 'action_must_one_any_non_villain'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0,
    obligatory: true
  })
}
