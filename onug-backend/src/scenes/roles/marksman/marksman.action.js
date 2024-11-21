import { generateRoleAction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield } from '../../sceneUtils'

export const marksmanInteraction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.shield)

  //TODO if no marks only cards

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 },
    selectable_cards: selectablePlayersWithNoShield,
    selectable_card_limit: { player: 1, center: 0 },
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_one_any'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 }
    },
    selectableCards: {
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 }
    },
    obligatory: true
  })
}
