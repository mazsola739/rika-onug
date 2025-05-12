import { getPlayerNumbersByGivenConditions } from './getPlayerNumbers'
import { updatePlayerKnownMark } from './updateMark'

export const swapMarks = (gamestate, token, position1, position2, canSee) => {
  const mark1 = { ...gamestate.positions.card_positions[position1].mark }
  const mark2 = { ...gamestate.positions.card_positions[position2].mark }
  gamestate.positions.card_positions[position1].mark = mark2
  gamestate.positions.card_positions[position2].mark = mark1

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

  if (currentPlayerNumber === position1 || currentPlayerNumber === position2) {
    const mark = canSee ? gamestate.positions.card_positions[position1].mark : ''
    updatePlayerKnownMark(gamestate, token, mark)
  }

  gamestate.players[token].card_or_mark_action = true
}
