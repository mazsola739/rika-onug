import { getNeighborPlayerNumbersByToken } from '../sceneUtils'
import { getPlayerNumbersByGivenConditions } from './getPlayerNumbersByGivenConditions'

export const alienAbducted = (players, cowToken) => {
  const cowNeighbors = getNeighborPlayerNumbersByToken(players, cowToken)
  const aliens = getPlayerNumbersByGivenConditions(players, 'aliens')

  for (let alien of aliens) {
    if (cowNeighbors.includes(alien)) {
      return true
    }
  }

  return false
}
