import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { cupidResponse } from './cupid.response'

export const cupidAction = (gamestate, token, title) => {
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayers')
  const selectable_mark_limit = { mark: 2 }
  const scene_end = selectable_marks.length === 0

  if (selectable_marks.length === 2) {
    gamestate.players[token].player_history[title].selectable_marks = selectable_marks
    cupidResponse(gamestate, token, selectable_marks, title)
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: [scene_end ? 'action_no_selectable_player' : 'action_must_two_any'],
      selectableMarks: { selectable_marks, selectable_mark_limit },
      obligatory: !scene_end,
      scene_end
    })
  }
}
