import { getPlayerNeighborsByToken, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

const alienAbduction = (gamestate, token) => {
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)
  const aliens = getPlayerNumbersByGivenConditions(gamestate, 'alien')
  return neighbors.some(neighbor => aliens.includes(neighbor))
}

export const cowAction = (gamestate, token, title) => {
  const neighborIsAlien = alienAbduction(gamestate, token)

  return generateRoleAction(gamestate, token, title, {
    private_message: [neighborIsAlien ? 'action_got_tapped_by_alien' : 'action_no_tap'],
    scene_end: true
  })
}
