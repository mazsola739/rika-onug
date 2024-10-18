import { generateRoleInteraction } from "../../generateRoleInteraction"
import { getPartOfGroupByToken, formatPlayerIdentifier } from "../../sceneUtils"

export const blobInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
    const randomInstruction = newGamestate.scene.narration[0]
    
    const partOfBlob = getPartOfGroupByToken(newGamestate.players, token, randomInstruction)
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      blob: partOfBlob,
    }
  
    const messageIdentifiers = formatPlayerIdentifier(partOfBlob)
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_part_of_blob', ...messageIdentifiers],
      icon: 'blob',
      uniqueInformations: { blob: partOfBlob },
    })
  }