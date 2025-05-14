import { logTrace } from '../../log'

export const validateAnswerSelection = (gamestate, token, selected_answer, title) => {
  logTrace(`validateAnswerSelection called when actual scene is: ${title}`)

  const player_history = gamestate.players[token]?.player_history[title]

  if (!selected_answer || !player_history.answer_options.includes(selected_answer)) {
    return false
  }

  gamestate.players[token].player_history[title].selected_answer = selected_answer

  logTrace(`validateAnswerSelection finished successfully for scene: ${title}`)
  return true
}
