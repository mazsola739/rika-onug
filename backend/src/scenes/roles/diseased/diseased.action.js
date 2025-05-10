import { generateRoleAction, getPlayerNeighborsByToken } from '../../sceneUtils'

export const diseasedAction = (gamestate, token, title) => {
  const selectable_marks = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)
  const selectable_mark_limit = { mark: 1 }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_must_one_neighbor'],
    selectableMarks: { selectable_marks, selectable_mark_limit },
    obligatory: true
  })
}
