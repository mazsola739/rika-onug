import { generateRoleInteraction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../sceneUtils'

export const assassinInteraction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)

  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 },
    obligatory: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_must_one_any'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 }
    },
    obligatory: true
  })
}
