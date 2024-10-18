import { generateRoleInteraction } from "../../generateRoleInteraction"
import { formatPlayerIdentifier } from "../../utils"
import { getAnySeerPlayerNumbersByRoleIds } from "./beholder.utils"

export const beholderInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
    
    const seers = getAnySeerPlayerNumbersByRoleIds(newGamestate.players)
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      seers,
    }
  
    const messageIdentifiers = formatPlayerIdentifier(seers)
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_seers', ...messageIdentifiers, 'interaction_may_look'],
      icon: 'seer',
      uniqueInformations: { seers, answer_options: ['yes', 'no'] },
    })
  }
  