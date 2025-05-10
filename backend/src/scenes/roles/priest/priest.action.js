import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const priestAction = (gamestate, token, title) => {
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'otherPlayers', [], token)
  const selectable_mark_limit = { mark: 1 }

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const currentPlayerMark = gamestate.positions.card_positions[currentPlayerNumber].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const clarityOnePosition = gamestate.positions.doppelganger_mark_positions.clarity_1
    gamestate.positions.card_positions[currentPlayerNumber].mark = clarityOnePosition
    gamestate.positions.doppelganger_mark_positions.clarity_1 = currentPlayerMark
  } else {
    const clarityOnePosition = gamestate.positions.mark_positions.clarity_1
    gamestate.positions.card_positions[currentPlayerNumber].mark = clarityOnePosition
    gamestate.positions.mark_positions.clarity_1 = currentPlayerMark
  }

  gamestate.players[token].card.player_mark = 'mark_of_clarity'

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_may_one_any_other'],
    selectableMarks: { selectable_marks, selectable_mark_limit },
    uniqueInformation: { mark_of_clarity: [currentPlayerNumber] }
  })
}
