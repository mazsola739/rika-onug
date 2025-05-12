import { getCardIdsByPositions } from './getCardIds'

export const sawCards = (gamestate, positions, token) => {
  if (positions.some(position => gamestate.positions.card_positions[position].card.id === gamestate.players[token].card.player_original_id)) {
    gamestate.players[token].card.player_card_id = 87
  }

  gamestate.players[token].card_or_mark_action = true

  return getCardIdsByPositions(gamestate.positions.card_positions, positions)
}
