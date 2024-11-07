import { formatPlayerIdentifier, generateRoleInteraction, getPartOfGroupByToken } from '../../sceneUtils'

export const blobInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const randomInstruction = newGamestate.scene.narration[0]

  const partOfBlob = getPartOfGroupByToken(newGamestate.players, token, randomInstruction)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    part_of_blob: partOfBlob,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(partOfBlob)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_part_of_blob', ...messageIdentifiers],
    uniqueInformations: { part_of_blob: partOfBlob },
    scene_end: true
  })
}
