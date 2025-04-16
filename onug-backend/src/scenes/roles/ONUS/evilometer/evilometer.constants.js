import { getNeighborPlayerNumbersByToken, getPlayerNumbersByGivenConditions } from '../../../sceneUtils'

export const superVillainDetected = (players, evilometerToken) => {
  const evilometerNeighbors = getNeighborPlayerNumbersByToken(players, evilometerToken)
  const superVillains = getPlayerNumbersByGivenConditions(players, 'villain')

  for (let villain of superVillains) {
    if (evilometerNeighbors.includes(villain)) {
      return true
    }
  }

  return false
}
