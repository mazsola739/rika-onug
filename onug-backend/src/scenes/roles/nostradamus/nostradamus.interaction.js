import { generateRoleInteraction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield } from '../../sceneUtils'

export const nostradamusInteraction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.shield)

  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayersWithNoShield,
    selectable_card_limit: { player: 3, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length < 3 ? 'interaction_no_selectable_player' : 'interaction_must_three_any'],
    selectableCards: {
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 3, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
