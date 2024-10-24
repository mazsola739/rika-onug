import { getPartOfGroupByToken, generateRoleInteraction } from '../../sceneUtils'

export const familymanInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const randomInstruction = newGamestate.scene.narration[1]
  
  const partOfFamily = getPartOfGroupByToken(newGamestate.players, token, randomInstruction)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    part_of_family: partOfFamily,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_part_of_family'],
    uniqueInformations: { part_of_family: partOfFamily, },
  })
}
