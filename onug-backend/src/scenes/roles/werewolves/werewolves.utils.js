import { ALL_WEREWOLF } from '../../../constants'

export const getWerewolfPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (ALL_WEREWOLF.includes(player.card.player_role_id)) {
      result.push(player.player_number)
    }
  }

  return result
}

export const getDreamWolfPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 21) {
      result.push(player.player_number)
    }
  }

  return result
}
