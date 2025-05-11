import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const thecountAction = (gamestate, token, title) => {
  const nonVampires = getPlayerNumbersByGivenConditions(gamestate.players, 'nonVampire')
  const new_vampire = gamestate.roles.vampires.new_vampire

  const selectable_marks = nonVampires.filter(position => !new_vampire.includes(position))
  const selectable_mark_limit = { mark: 1 }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_must_one_any_non_vampire'],
    selectableMarks: { selectable_marks, selectable_mark_limit },
    obligatory: true
  })
}
