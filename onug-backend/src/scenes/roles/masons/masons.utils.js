import { IDS } from '../../../constants'

export const getMasonPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (IDS.MASONS.includes(player.card.player_role_id)) {
      result.push(player.player_number)
    }
  }

  return result
}
