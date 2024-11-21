import { generateRoleAction, getPlayerNeighborsByToken } from '../../sceneUtils'
import { alienAbducted } from './cow.utils'

export const cowInteraction = (gamestate, token, title) => {
  const neighborIsAlien = alienAbducted(gamestate.players, token)
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    alien_neighbor: neighborIsAlien ? neighbors : [],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: [neighborIsAlien ? 'interaction_got_tapped_by_alien' : 'interaction_no_tap'],
    uniqueInformations: { alien_neighbor: neighborIsAlien ? neighbors : [] },
    scene_end: true
  })
}
