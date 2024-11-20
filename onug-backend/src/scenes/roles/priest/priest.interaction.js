import { generateRoleInteraction, getPlayerNumbersWithNonMatchingTokens, getPlayerNumberWithMatchingToken } from '../../sceneUtils'

export const priestInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGamestate.players, [token])

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerMark = newGamestate.card_positions[currentPlayerNumber].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const clarityOnePosition = newGamestate.doppelganger_mark_positions.clarity_1
    newGamestate.card_positions[currentPlayerNumber].mark = clarityOnePosition
    newGamestate.doppelganger_mark_positions.clarity_1 = currentPlayerMark
  } else {
    const clarityOnePosition = newGamestate.mark_positions.clarity_1
    newGamestate.card_positions[currentPlayerNumber].mark = clarityOnePosition
    newGamestate.mark_positions.clarity_1 = currentPlayerMark
  }

  newGamestate.players[token].card.player_mark = 'mark_of_clarity'

    //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 },
    mark_of_clarity: [currentPlayerNumber]
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_one_any_other'],
    selectableMarks: {
      selectable_marks: selectablePlayerNumbers,
      selectable_mark_limit: { mark: 1 }
    }
  })
}
