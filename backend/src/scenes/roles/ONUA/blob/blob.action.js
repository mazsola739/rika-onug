import { formatPlayerIdentifier, generateRoleAction, getPartOfGroupByToken } from '../../../sceneUtils'

export const blobAction = (gamestate, token, title) => {
  const randomInstruction = gamestate.roles.blob.instruction

  const partOfBlob = getPartOfGroupByToken(gamestate.players, token, randomInstruction)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    part_of_blob: partOfBlob,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(partOfBlob)

  return generateRoleAction(gamestate, token, {
    private_message: ['action_part_of_blob', ...messageIdentifiers, 'POINT'],
    uniqueInformation: { part_of_blob: partOfBlob },
    scene_end: true
  })
}
