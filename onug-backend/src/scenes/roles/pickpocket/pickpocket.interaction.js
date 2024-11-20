import { generateRoleInteraction, getPlayerNumbersWithNonMatchingTokens } from '../../sceneUtils'

export const pickpocketInteraction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(gamestate.players, [token])

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 }
  }

  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_may_one_any_other'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 }
    }
  })
}
