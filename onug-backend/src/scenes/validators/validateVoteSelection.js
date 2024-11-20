import { logTrace } from '../../log'

//TODO actual scene (timestamp)
export const validateVoteSelection = (selected_vote, player_history, title) => {
  logTrace(`validateVoteSelection called when actual scene is: ${title}`)

  if (!selected_vote || !player_history[title].answer_options.includes(selected_vote)) {
    return false
  }

  logTrace(`validateVoteSelection finished and everything allright: ${title}`)
  return true
}
