import { IDS } from "../../constants"

export const getAlienPlayerNumbersByRoleIds = players => {
    const result = []
  
    for (const token in players) {
      const player = players[token]
      if (IDS.ALL_ALIEN_IDS.includes(player.card.player_role_id)) {
        result.push(`player_${player.player_number}`)
      }
    }
  
    return result
  }