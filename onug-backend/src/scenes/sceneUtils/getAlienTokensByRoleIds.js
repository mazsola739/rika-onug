import { IDS } from "../../constants"

export const getAlienTokensByRoleIds = players => {
    const result = []
  
    for (const token in players) {
      const player = players[token]
      if (IDS.ALL_ALIEN_IDS.includes(player.card.player_role_id)) {
        result.push(token)
      }
    }
  
    return result
  }
  