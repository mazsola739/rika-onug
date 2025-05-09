import { generateRoleAction, getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../sceneUtils'

export const assassinAction = (gamestate, token, title) => {
  const allPlayerTokens = getAllPlayerTokens(gamestate.players)
  const selectable_marks = getPlayerNumbersWithMatchingTokens(gamestate.players, allPlayerTokens)
  const selectable_mark_limit = { mark: 1 }

  if (selectable_marks.length > 1) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_marks,
      selectable_mark_limit,
      obligatory: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_must_one_any'],
      selectableMarks: { selectable_marks, selectable_mark_limit },
      obligatory: true
    })
  }
}
