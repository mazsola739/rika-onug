import { logTrace } from '../../log'

export const validateMarkSelection = (selected_mark_positions, gamestate, token, title) => {
  logTrace(`validateMarkSelection called when actual scene is: ${title}`)

  const player_history = gamestate.players[token]?.player_history[title]
  const playerHistorySelectableMarks = player_history.selectable_marks || []
  const selectableMarkLimit = player_history.selectable_mark_limit || {}

  if (selected_mark_positions.length === 0 || !selected_mark_positions.every(position => playerHistorySelectableMarks.includes(position))) {
    return false
  }

  if (selected_mark_positions.length !== selectableMarkLimit.mark) {
    return false
  }

  gamestate.players[token].player_history[title].selected_mark_positions = selected_mark_positions

  logTrace(`validateMarkSelection finished successfully for scene: ${title}`)
  return true
}
