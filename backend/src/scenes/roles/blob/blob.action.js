import { formatPlayerIdentifier, generateRoleAction, getPartOfGroupByToken } from '../../sceneUtils'

export const blobAction = (gamestate, token, title) => {
  const randomInstruction = gamestate.roles.blob.instruction

  const part_of_blob = getPartOfGroupByToken(gamestate.players, token, randomInstruction)
  gamestate.roles.blob.part_of_blob = part_of_blob

  const messageIdentifiers = formatPlayerIdentifier(part_of_blob)

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_part_of_blob', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { part_of_blob },
    scene_end: true
  })
}
