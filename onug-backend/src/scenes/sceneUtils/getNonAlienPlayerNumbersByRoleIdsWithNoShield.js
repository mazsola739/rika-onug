import { ALL_ALIEN } from '../../constants'

export const getNonAlienPlayerNumbersByRoleIdsWithNoShield = (players, shieldedCards) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!ALL_ALIEN.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number)) {
      result.push(player.player_number)
    }
  }

  return result
}
