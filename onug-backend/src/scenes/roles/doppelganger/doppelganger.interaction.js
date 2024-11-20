import { generateRoleInteraction, getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield } from '../../sceneUtils'

//TODO shield?
export const doppelgangerInteraction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(gamestate.players, [token])
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.shield)

  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayersWithNoShield,
    selectable_card_limit: { player: 1, center: 0 },
    obligatory: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_must_one_any_other'],
    selectableCards: {
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 }
    },
    obligatory: true
  })
}
