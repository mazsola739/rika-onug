import { generateRoleAction, getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield } from '../../../sceneUtils'

//TODO shield?
export const doppelgangerAction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(gamestate.players, [token])
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.positions.shielded_cards)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayersWithNoShield,
    selectable_card_limit: { player: 1, center: 0 },
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_one_any_other'],
    selectableCards: {
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 }
    },
    obligatory: true
  })
}
