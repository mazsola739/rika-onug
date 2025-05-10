import { generateRoleAction, getPlayerNeighborsByToken, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const evilometerAction = (gamestate, token, title) => {
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)
  const superVillainDetected = (players, neighbors) => {
    const superVillains = getPlayerNumbersByGivenConditions(players, 'villain')
    return neighbors.some(neighbor => superVillains.includes(neighbor))
  }
  const neighborIsSuperVillain = superVillainDetected(gamestate.players, neighbors)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    villain_neighbor: neighborIsSuperVillain ? neighbors : [],
    scene_end: true
  }

  return generateRoleAction(gamestate, token, {
    private_message: [neighborIsSuperVillain ? 'action_got_tapped_by_villain' : 'action_no_tap'],
    uniqueInformation: {
      villain_neighbor: neighborIsSuperVillain ? neighbors : []
    },
    scene_end: true
  })
}
