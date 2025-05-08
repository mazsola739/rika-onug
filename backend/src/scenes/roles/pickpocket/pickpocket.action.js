import { generateRoleAction, getPlayerNumbersWithNonMatchingTokens } from '../../sceneUtils'

export const pickpocketAction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(gamestate.players, [token])

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 }
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_one_any_other'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 }
    }
  })
}
