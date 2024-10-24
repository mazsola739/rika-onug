import { ALL_SUPER_VILLAIN_IDS } from '../../constants'

export const getVillainPlayerNumbersByRoleIds = players => {
    const result = []
  
    for (const token in players) {
      const player = players[token]
      if (ALL_SUPER_VILLAIN_IDS.includes(player.card.player_role_id)) {
        result.push(`player_${player.player_number}`)
      }
    }
  
    return result
  }