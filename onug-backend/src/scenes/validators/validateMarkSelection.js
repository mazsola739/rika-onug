//TODO actual scene (timestamp)
export const validateMarkSelection = (selected_mark_positions, player_history, title) => {
  if (selected_mark_positions.length === 0 || !selected_mark_positions.every(position => player_history[title].selectable_marks.includes(position))) {
    return false
  }

  if (selected_mark_positions.length !== player_history[title].selectable_mark_limit.mark) {
    return false
  }

  return true
}
