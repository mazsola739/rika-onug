import { generateRoleInteraction, getPartOfGroupByToken } from '../../sceneUtils'

export const familymanInteraction = (gamestate, token, title) => {
  const randomInstruction = gamestate.scene.narration[1]

  const partOfFamily = getPartOfGroupByToken(gamestate.players, token, randomInstruction)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    part_of_family: partOfFamily,
    scene_end: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_part_of_family'],
    uniqueInformations: { part_of_family: partOfFamily },
    scene_end: true
  })
}
