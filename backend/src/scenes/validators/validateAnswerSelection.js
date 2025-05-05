import { logTrace } from '../../log'

//TODO get gamestate from origin, not as varriant

export const validateAnswerSelection = (selected_answer, player_history, title) => {
  logTrace(`validateAnswerSelection called when actual scene is: ${title}`)

  if (!selected_answer || !player_history[title].answer_options.includes(selected_answer)) {
    return false
  }

  logTrace(`validateAnswerSelection finished and everything all right: ${title}`)
  return true
}
