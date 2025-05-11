import { getPlayerNumbersByGivenConditions } from './getPlayerNumbersByGivenConditions'

export const swapCards = (gamestate, position1, position2, token) => {
  const card1 = { ...gamestate.positions.card_positions[position1].card }
  const card2 = { ...gamestate.positions.card_positions[position2].card }
  gamestate.positions.card_positions[position1].card = card2
  gamestate.positions.card_positions[position2].card = card1

  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

  if (currentPlayerNumber === position1 || currentPlayerNumber === position2) {
    gamestate.players[token].card.player_card_id = 87
  }

  gamestate.players[token].card_or_mark_action = true
}
