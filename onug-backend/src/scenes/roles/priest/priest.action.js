import { generateRoleAction, getPlayerNumbersWithNonMatchingTokens, getPlayerNumberWithMatchingToken } from '../../sceneUtils'

export const priestInteraction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(gamestate.players, [token])

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const currentPlayerMark = gamestate.card_positions[currentPlayerNumber].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const clarityOnePosition = gamestate.doppelganger_mark_positions.clarity_1
    gamestate.card_positions[currentPlayerNumber].mark = clarityOnePosition
    gamestate.doppelganger_mark_positions.clarity_1 = currentPlayerMark
  } else {
    const clarityOnePosition = gamestate.mark_positions.clarity_1
    gamestate.card_positions[currentPlayerNumber].mark = clarityOnePosition
    gamestate.mark_positions.clarity_1 = currentPlayerMark
  }

  gamestate.players[token].card.player_mark = 'mark_of_clarity'

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 },
    mark_of_clarity: [currentPlayerNumber]
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_one_any_other'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 }
    }
  })
}
