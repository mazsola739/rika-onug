import { getNonVampirePlayerNumbersByRoleIds, generateRoleInteraction } from '../../sceneUtils'

export const thecountInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGamestate)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_any_non_vampire'],
    selectableCards: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
  })
}
