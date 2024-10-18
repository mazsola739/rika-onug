import { getVampirePlayerNumbersByRoleIds, getNonVampirePlayerNumbersByRoleIds, generateRoleInteraction } from "../../sceneUtils"

export const vampiresInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGamestate)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
    vampires,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_vampires', 'interaction_must_one_any_non_vampire'],
    selectableMarks: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { vampires },
  })
}
