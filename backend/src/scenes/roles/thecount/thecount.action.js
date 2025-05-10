import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const thecountAction = (gamestate, token, title) => {
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'nonVampire') //TODO fix on player not swapped the mark yet, so its not showing the fresh mark_of_vampire
  const selectable_mark_limit = { mark: 1 }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_must_one_any_non_vampire'],
    selectableMarks: { selectable_marks, selectable_mark_limit },
    obligatory: true
  })
}
