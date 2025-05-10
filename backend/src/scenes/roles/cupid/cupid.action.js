import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const cupidAction = (gamestate, token, title) => {
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayers')
  const selectable_mark_limit = { mark: 2 }

  //const isTwoSelectable = selectablePlayerNumbers.length === 2

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_must_two_any'],
    selectableMarks: { selectable_marks, selectable_mark_limit },
    obligatory: true
  })
}
