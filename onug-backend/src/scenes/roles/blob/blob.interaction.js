import { formatPlayerIdentifier, generateRoleInteraction, getPartOfGroupByToken } from '../../sceneUtils'

export const blobInteraction = (gamestate, token, title) => {
  const randomInstruction = gamestate.scene.narration[0]

  const partOfBlob = getPartOfGroupByToken(gamestate.players, token, randomInstruction)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    part_of_blob: partOfBlob,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(partOfBlob)

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_part_of_blob', ...messageIdentifiers],
    uniqueInformations: { part_of_blob: partOfBlob },
    scene_end: true
  })
}
