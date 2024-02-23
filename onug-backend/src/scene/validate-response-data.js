//@ts-check
export const isValidCardSelection = (selected_card_positions, player_history) => {
  if (selected_card_positions.length === 0 || !selected_card_positions.every(position => player_history.selectable_cards.includes(position))) {
    return false
  }

  const hasPlayerPositions = selected_card_positions.some(position => position.startsWith("player_"))
  const hasCenterPositions = selected_card_positions.some(position => position.startsWith("center_"))

  if (hasPlayerPositions && hasCenterPositions || selected_card_positions.length !== player_history.selectable_card_limit[hasPlayerPositions ? "player" : "center"]) {
    return false
  }

  return true
}

export const isValidMarkSelection = (selected_mark_positions, player_history) => {
  if (selected_mark_positions.length === 0 || !selected_mark_positions.every(position => player_history.selectable_marks.includes(position))) {
    return false
  }

  if (selected_mark_positions.length !== player_history.selectable_mark_limit.mark) {
    return false
  }

  return true
}