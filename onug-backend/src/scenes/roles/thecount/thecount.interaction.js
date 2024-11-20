import { generateRoleInteraction, getNonVampirePlayerNumbersByRoleIds } from '../../sceneUtils'

export const thecountInteraction = (gamestate, token, title) => {
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(gamestate)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_marks: nonVampires,
    selectable_mark_limit: { mark: 1 },
    obligatory: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_must_one_any_non_vampire'],
    selectableCards: {
      selectable_marks: nonVampires,
      selectable_mark_limit: { mark: 1 }
    },
    obligatory: true
  })
}
