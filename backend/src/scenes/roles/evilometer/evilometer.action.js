import { generateRoleAction, getPlayerNeighborsByToken, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const evilometerAction = (gamestate, token, title) => {
  const neighbors = getPlayerNeighborsByToken(gamestate.players, token, 'both', 1)
  const superVillains = getPlayerNumbersByGivenConditions(gamestate, 'villain')
  const superVillainDetecion = neighbors.some(neighbor => superVillains.includes(neighbor))

  return generateRoleAction(gamestate, token, title, {
    private_message: [superVillainDetecion ? 'action_got_tapped_by_villain' : 'action_no_tap'],
    scene_end: true
  })
}
