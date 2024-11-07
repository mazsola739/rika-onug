import { generateRoleInteraction, getPlayerNumbersWithNonMatchingTokens } from '../../sceneUtils'

export const pickpocketInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGamestate.players, [token])

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 }
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_one_any_other'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 }
    }
  })
}
