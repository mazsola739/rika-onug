import {
  getNeighborPlayerNumbersByToken,
  getVillainPlayerNumbersByRoleIds,
} from '../../sceneUtils'

export const superVillainDetected = (players, evilometerToken) => {
  const evilometerNeighbors = getNeighborPlayerNumbersByToken(
    players,
    evilometerToken
  )
  const superVillains = getVillainPlayerNumbersByRoleIds(players)

  for (let villain of superVillains) {
    if (evilometerNeighbors.includes(villain)) {
      return true
    }
  }

  return false
}
