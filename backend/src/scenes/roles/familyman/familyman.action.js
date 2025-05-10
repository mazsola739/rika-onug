import { generateRoleAction, getPartOfGroupByToken } from '../../sceneUtils'

export const familymanAction = (gamestate, token, title) => {
  const randomInstruction = gamestate.roles.familyman.instruction
  const part_of_family = getPartOfGroupByToken(gamestate.players, token, randomInstruction)

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_part_of_family'],
    uniqueInformation: { part_of_family },
    scene_end: true
  })
}
