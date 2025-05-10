import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const assassinAction = (gamestate, token, title) => {
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayers')
  const selectable_mark_limit = { mark: 1 }

  if (selectable_marks.length > 1) {

    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_must_one_any'],
      selectableMarks: { selectable_marks, selectable_mark_limit },
      obligatory: true
    })
  }
}
