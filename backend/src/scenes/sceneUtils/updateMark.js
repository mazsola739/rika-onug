export const updateMark = (gamestate, token, positions, marks) => {
  positions.forEach((position, index) => {
    const mark = marks[index]
    if (gamestate.players[token].card.player_original_id === 1) {
      const doppelgangerMarkPosition = gamestate.positions.doppelganger_mark_positions[mark]
      const selectedPosition = gamestate.positions.card_positions[position].mark

      gamestate.positions.doppelganger_mark_positions[mark] = selectedPosition
      gamestate.positions.card_positions[position].mark = doppelgangerMarkPosition
    } else {
      const markPosition = gamestate.positions.mark_positions[mark]
      const selectedPosition = gamestate.positions.card_positions[position].mark

      gamestate.positions.mark_positions[mark] = selectedPosition
      gamestate.positions.card_positions[position].mark = markPosition
    }
  })

  gamestate.players[token].card_or_mark_action = true
}