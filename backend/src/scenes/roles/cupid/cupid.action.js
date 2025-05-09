import { generateRoleAction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../sceneUtils'

export const cupidAction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectable_marks = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
  const selectable_mark_limit = { mark: 2 }

  //const isTwoSelectable = selectablePlayerNumbers.length === 2

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks,
    selectable_mark_limit,
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_two_any'],
    selectableMarks: { selectable_marks, selectable_mark_limit },
    obligatory: true
  })
}
