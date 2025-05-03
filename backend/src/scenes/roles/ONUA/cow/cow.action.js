import { alienAbducted, getPlayerNeighborsByToken, generateRoleAction } from '../../../sceneUtils'

export const cowAction = (gamestate, token, title) => {
  const neighborIsAlien = alienAbducted(gamestate.players, token)
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    alien_neighbor: neighborIsAlien ? neighbors : [],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: [neighborIsAlien ? 'action_got_tapped_by_alien' : 'action_no_tap'],
    uniqueInformation: { alien_neighbor: neighborIsAlien ? neighbors : [] },
    scene_end: true
  })
}
