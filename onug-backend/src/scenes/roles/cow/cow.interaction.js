import {
  generateRoleInteraction,
  getPlayerNeighborsByToken,
} from '../../sceneUtils'
import { alienAbducted } from './cow.utils'

export const cowInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const neighborIsAlien = alienAbducted(newGamestate.players, token)
  const neighbors = getPlayerNeighborsByToken(newGamestate.players, 'both', 1)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    alien_neighbor: neighborIsAlien ? neighbors : [],
    scene_end: true,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [
      neighborIsAlien
        ? 'interaction_got_tapped_by_alien'
        : 'interaction_no_tap',
    ],
    uniqueInformations: { alien_neighbor: neighborIsAlien ? neighbors : [] },
    scene_end: true,
  })
}
