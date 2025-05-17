import { getPlayerNeighborsByToken, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const cowAction = (gamestate, token, title) => {
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)
  const aliens = getPlayerNumbersByGivenConditions(gamestate, 'alien')
  const alienAbduction = neighbors.some(neighbor => aliens.includes(neighbor))

  return generateRoleAction(gamestate, token, title, {
    private_message: [alienAbduction ? 'action_got_tapped_by_alien' : 'action_no_tap'],
    scene_end: true
  })
}
