import { ALL_VAMPIRE } from '../../constants'

export const getVampireTokensByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (ALL_VAMPIRE.includes(player.card.player_role_id)) {
      result.push(token)
    }
  }

  return result
}
