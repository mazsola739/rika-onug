import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const instigatorAction = (gamestate, token, title) => {
  const selectable_marks = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayers')
  const selectable_mark_limit = { mark: 1 }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks,
    selectable_mark_limit,
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_one_any'],
    selectableMarks: { selectable_marks, selectable_mark_limit },
    obligatory: true
  })
}
