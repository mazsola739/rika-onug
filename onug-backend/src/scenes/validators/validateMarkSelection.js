import { logTrace } from '../../log'

//TODO actual scene (timestamp)
export const validateMarkSelection = (
  selected_mark_positions,
  player_history,
  title
) => {
  logTrace(`validateMarkSelection called when actual scene is: ${title}`)

  if (
    selected_mark_positions.length === 0 ||
    !selected_mark_positions.every((position) =>
      player_history[title].selectable_marks.includes(position)
    )
  ) {
    return false
  }

  if (
    selected_mark_positions.length !==
    player_history[title].selectable_mark_limit.mark
  ) {
    return false
  }

  logTrace(`validateMarkSelection finished and everything allright: ${title}`)
  return true
}
