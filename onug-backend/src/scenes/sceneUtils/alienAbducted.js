import { getAlienPlayerNumbersByRoleIds, getNeighborPlayerNumbersByToken } from '../sceneUtils'

export const alienAbducted = (players, cowToken) => {
  const cowNeighbors = getNeighborPlayerNumbersByToken(players, cowToken)
  const aliens = getAlienPlayerNumbersByRoleIds(players)

  for (let alien of aliens) {
    if (cowNeighbors.includes(alien)) {
      return true
    }
  }

  return false
}
