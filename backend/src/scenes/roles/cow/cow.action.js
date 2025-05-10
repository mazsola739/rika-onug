import { getPlayerNeighborsByToken, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const cowAction = (gamestate, token, title) => {
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)
  const alienAbducted = (players, neighbors) => {
    const aliens = getPlayerNumbersByGivenConditions(players, 'alien')
    return neighbors.some(neighbor => aliens.includes(neighbor))
  }
  const neighborIsAlien = alienAbducted(gamestate.players, neighbors)

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
