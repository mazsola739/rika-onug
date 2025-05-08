import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const thecountAction = (gamestate, token, title) => {
  const nonVampires = getPlayerNumbersByGivenConditions(gamestate.players, 'nonVampire') //TODO fix on player not swapped the mark yet, so its not showing the fresh mark_of_vampire

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
