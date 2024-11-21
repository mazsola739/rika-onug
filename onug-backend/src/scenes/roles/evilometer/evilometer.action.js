import { generateRoleAction, getPlayerNeighborsByToken } from '../../sceneUtils'
import { superVillainDetected } from './evilometer.constants'

export const evilometerInteraction = (gamestate, token, title) => {
  const neighborIsSuperVillain = superVillainDetected(gamestate.players, token)
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    villain_neighbor: neighborIsSuperVillain ? neighbors : [],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: [neighborIsSuperVillain ? 'interaction_got_tapped_by_villain' : 'interaction_no_tap'],
    uniqueInformations: {
      villain_neighbor: neighborIsSuperVillain ? neighbors : []
    },
    scene_end: true
  })
}
