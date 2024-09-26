
//TODO actual scene (timestamp)
export const validateCardSelection = (selected_card_positions, player_history, title) => {
  if (selected_card_positions.length === 0 || !selected_card_positions.every(position => player_history[title]?.selectable_cards.includes(position))) {
    return false
  }

  const hasPlayerPositions = selected_card_positions.some(position => position.startsWith("player_"))
  const hasCenterPositions = selected_card_positions.some(position => position.startsWith("center_"))

  if (hasPlayerPositions && hasCenterPositions || selected_card_positions.length !== player_history[title]?.selectable_card_limit[hasPlayerPositions ? "player" : "center"]) {
    return false
  }

  return true
}

export const validateMarkSelection = (selected_mark_positions, player_history, title) => {
  if (selected_mark_positions.length === 0 || !selected_mark_positions.every(position => player_history[title].selectable_marks.includes(position))) {
    return false
  }

  if (selected_mark_positions.length !== player_history[title].selectable_mark_limit.mark) {
    return false
  }

  return true
}

export const validateAnswerSelection = (selected_answer, player_history, title) => {
  if (!selected_answer || !player_history[title].answer_options.includes(selected_answer)) {
    return false
  }

  return true
}