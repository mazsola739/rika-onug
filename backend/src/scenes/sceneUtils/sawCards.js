import { getCardIdsByPositions } from './getCardIds'
import { getPlayerNumbersByGivenConditions } from './getPlayerNumbers'
import { updatePlayerKnownCard } from './updateCard'

export const sawCards = (gamestate, positions, token) => {
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

  if (positions.some(position => gamestate.positions.card_positions[position].card.id === gamestate.players[token].card.player_card_id && currentPlayerNumber !== position)) {
    gamestate.players[token].card.player_card_id = 87
  }
  if (positions.some(position => gamestate.positions.card_positions[position].card.id !== gamestate.players[token].card.player_card_id && currentPlayerNumber === position)) {
    const { id, team } = gamestate.positions.card_positions[currentPlayerNumber].card
    const { player_role_id, player_role } = gamestate.players[token].card
    updatePlayerKnownCard(gamestate, token, id, player_role, player_role_id, team)
  }

  gamestate.players[token].card_or_mark_action = true

  return getCardIdsByPositions(gamestate.positions.card_positions, positions)
}
