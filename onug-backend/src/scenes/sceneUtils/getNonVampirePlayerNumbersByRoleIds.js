import { ALL_VAMPIRE } from '../../constants'

export const getNonVampirePlayerNumbersByRoleIds = gamestate => {
  const result = []

  for (const token in gamestate.players) {
    const player = gamestate.players[token]

    if (!ALL_VAMPIRE.includes(player.card.player_role_id)) {
      result.push(player.player_number)
    }
  }

  return result
}
