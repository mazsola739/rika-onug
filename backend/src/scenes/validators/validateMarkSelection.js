import { logTrace } from '../../log'

export const validateMarkSelection = (gamestate, token, selected_mark_positions, title) => {
  logTrace(`validateMarkSelection called when actual scene is: ${title}`)

  const player_history = gamestate.players[token]?.player_history[title]

  if (selected_mark_positions.length === 0 || !selected_mark_positions.every(position => player_history.selectable_marks.includes(position))) {
    return false
  }

  if (selected_mark_positions.length !== player_history.selectable_mark_limit.mark) {
    return false
  }

  gamestate.players[token].player_history[title].selected_mark_positions = selected_mark_positions

  logTrace(`validateMarkSelection finished successfully for scene: ${title}`)
  return true
}
