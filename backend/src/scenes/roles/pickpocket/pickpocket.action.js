import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const pickpocketAction = (gamestate, token, title) => {
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'otherPlayers', [], token)
  const selectable_mark_limit = { mark: 1 }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks,
    selectable_mark_limit
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_one_any_other'],
    selectableMarks: { selectable_marks, selectable_mark_limit }
  })
}
