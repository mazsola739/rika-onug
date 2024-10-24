import { ALL_VAMPIRE_IDS } from '../../constants'

export const getVampireTokensByRoleIds = players => {
    const result = []
  
    for (const token in players) {
      const player = players[token]
      if (ALL_VAMPIRE_IDS.includes(player.card.player_role_id)) {
        result.push(token)
      }
    }
  
    return result
  }