import { generateRoleAction, getPartOfGroupByToken } from '../../sceneUtils'

export const familymanAction = (gamestate, token, title) => {
  const randomInstruction = gamestate.roles.familyman.instruction

  const partOfFamily = getPartOfGroupByToken(gamestate.players, token, randomInstruction)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    part_of_family: partOfFamily,
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_part_of_family'],
    uniqueInformation: { part_of_family: partOfFamily },
    scene_end: true
  })
}
