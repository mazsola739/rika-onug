import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { thecountResponse } from './thecount.response'

export const thecountAction = (gamestate, token, title) => {
  const nonVampires = getPlayerNumbersByGivenConditions(gamestate.players, 'nonVampire')
  const new_vampire = gamestate.roles.vampires.new_vampire

  const selectable_marks = nonVampires.filter(position => !new_vampire.includes(position))
  const selectable_mark_limit = { mark: 1 }
  const scene_end = selectable_marks.length === 0

  if (selectable_marks.length === 1) {
    gamestate.players[token].player_history[title].selectable_marks = selectable_marks
    thecountResponse(gamestate, token, selectable_marks, title)
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: [scene_end ? 'action_no_selectable_player' : 'action_must_one_any_non_vampire'],
      selectableMarks: { selectable_marks, selectable_mark_limit },
      obligatory: !scene_end,
      scene_end
    })
  }
}
