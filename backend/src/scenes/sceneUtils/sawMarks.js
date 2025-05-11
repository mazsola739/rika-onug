import { getMarksByPositions, getPlayerNumbersByGivenConditions, updatePlayerKnownMark } from '.'

export const sawMarks = (gamestate, position, token) => {
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const selectedPositionMark = gamestate.positions.card_positions[position].mark

  if (currentPlayerNumber === position) {
    updatePlayerKnownMark(gamestate, token, selectedPositionMark)
  }

  gamestate.players[token].card_or_mark_action = true

  return getMarksByPositions(gamestate.positions.card_positions, position)
}
