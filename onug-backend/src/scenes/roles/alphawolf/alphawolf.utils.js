import { ALL_WEREWOLF } from '../../../constants'

export const getNonWerewolfPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!ALL_WEREWOLF.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(player.player_number)
    }
  }

  return result
}
