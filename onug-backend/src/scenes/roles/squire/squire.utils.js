import { IDS } from '../../../constants'

export const getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (IDS.ALL_WEREWOLF_IDS.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}
