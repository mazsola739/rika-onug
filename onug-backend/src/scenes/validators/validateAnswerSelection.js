//TODO actual scene (timestamp)
export const validateAnswerSelection = (selected_answer, player_history, title) => {
  if (!selected_answer || !player_history[title].answer_options.includes(selected_answer)) {
    return false
  }

  return true
}