import { ALL_VAMPIRE } from "../../constants"

export const getNonVampirePlayerNumbersByRoleIds = gamestate => {
    const result = []
  
    for (const token in gamestate.players) {
      const player = gamestate.players[token]
      const cardPositions = gamestate.card_positions
      if (!ALL_VAMPIRE.includes(player.card.player_role_id) && cardPositions[`player_${player.player_number}`].mark !== 'mark_of_vampire') {
        result.push(`player_${player.player_number}`)
      }
    }
  
    return result
  }
  