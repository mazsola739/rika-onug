import { logTrace } from '../../log'

export const validateAnswerSelection = (selected_answer, player_history, title) => {
  logTrace(`validateAnswerSelection called when actual scene is: ${title}`)

  if (!selected_answer || !player_history[title].answer_options.includes(selected_answer)) {
    return false
  }

  logTrace(`validateAnswerSelection finished and everything allright: ${title}`)
  return true
}
