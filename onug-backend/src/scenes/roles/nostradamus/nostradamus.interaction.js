import { generateRoleInteraction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield } from '../../sceneUtils'

export const nostradamusInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

    //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectablePlayersWithNoShield,
    selectable_card_limit: { player: 3, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [selectablePlayerNumbers.length < 3 ? 'interaction_no_selectable_player' : 'interaction_must_three_any'],
    selectableCards: {
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 3, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0,
  })
}
