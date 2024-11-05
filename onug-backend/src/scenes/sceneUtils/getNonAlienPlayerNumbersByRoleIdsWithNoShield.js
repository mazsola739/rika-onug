import { ALL_ALIEN } from '../../constants'

export const getNonAlienPlayerNumbersByRoleIdsWithNoShield = players => {
    const result = []
  
    for (const token in players) {
      const player = players[token]
      if (!ALL_ALIEN.includes(player.card.player_role_id) && !(player.card?.shield)) {
        result.push(`player_${player.player_number}`)
      }
    }
  
    return result
  }