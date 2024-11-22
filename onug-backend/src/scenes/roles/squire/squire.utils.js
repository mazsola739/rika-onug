import { ALL_WEREWOLF } from '../../../constants'

export const getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield = (players, shieldedCards) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (ALL_WEREWOLF.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number)) {
      result.push(player.player_number)
    }
  }

  return result
}
