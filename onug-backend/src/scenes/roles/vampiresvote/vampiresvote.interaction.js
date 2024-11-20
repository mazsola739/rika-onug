import { generateRoleInteraction, getNonVampirePlayerNumbersByRoleIds } from '../../sceneUtils'

export const vampiresvoteInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGamestate)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_options: nonVampires,
    selectable_marks: nonVampires,
    selectable_mark_limit: { mark: 1 },
    vote: true,
    obligatory: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_any_non_vampire'],
    selectableOptions: nonVampires,
    selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { vote: true },
    obligatory: true
  })
}
