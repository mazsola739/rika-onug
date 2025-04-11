import { getNeighborPlayerNumbersByToken, getPlayerNumbersByGivenConditions } from "."

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
