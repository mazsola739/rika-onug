import { IDS } from "../../constants"

export const getVampirePlayerNumbersByRoleIds = players => {
    const result = []
  
    for (const token in players) {
      const player = players[token]
      if (IDS.ALL_VAMPIRE_IDS.includes(player.card.player_role_id)) {
        result.push(`player_${player.player_number}`)
      }
    }
  
    return result
  }