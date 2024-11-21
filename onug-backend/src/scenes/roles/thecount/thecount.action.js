import { generateRoleAction, getNonVampirePlayerNumbersByRoleIds } from '../../sceneUtils'

export const thecountAction = (gamestate, token, title) => {
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(gamestate)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: nonVampires,
    selectable_mark_limit: { mark: 1 },
    obligatory: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_must_one_any_non_vampire'],
    selectableCards: {
      selectable_marks: nonVampires,
      selectable_mark_limit: { mark: 1 }
    },
    obligatory: true
  })
}
