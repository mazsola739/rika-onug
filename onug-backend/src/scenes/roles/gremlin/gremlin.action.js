import { generateRoleAction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield } from '../../sceneUtils'

export const gremlinInteraction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.shield)

  //TODO const isTwoSelectable = selectablePlayerNumbers.length === 2,
  //TODO if no marks only cards

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 2 },
    selectable_cards: selectablePlayersWithNoShield,
    selectable_card_limit: { player: 2, center: 0 },
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['interaction_must_two_any'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 2 }
    },
    selectableCards: {
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 2, center: 0 }
    },
    obligatory: true
  })
}
