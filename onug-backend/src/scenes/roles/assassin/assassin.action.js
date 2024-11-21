import { generateRoleAction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../sceneUtils'

export const assassinAction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)

  /* TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  if (isSingleSelectable) {
    
  } */

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 },
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_one_any'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 }
    },
    obligatory: true
  })
}
