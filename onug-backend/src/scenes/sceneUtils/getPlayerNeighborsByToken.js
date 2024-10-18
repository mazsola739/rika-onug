export const getPlayerNeighborsByToken = (players, token, direction, amount) => {
    const tokens = Object.keys(players)
    const playerCount = tokens.length
    const playerNumber = players[token].player_number
    const neighbors = {}
  
    if (direction === 'left' || direction === 'both') {
        let prevNeighborNumber = playerNumber - 1
        while (prevNeighborNumber !== playerNumber - amount && prevNeighborNumber !== playerNumber) {
            if (prevNeighborNumber < 1) {
                prevNeighborNumber = playerCount
            }
            const prevNeighborId = Object.keys(players).find(key => players[key].player_number === prevNeighborNumber)
            if (prevNeighborId) {
                neighbors['left'] = neighbors['left'] || []
                neighbors['left'].push(players[prevNeighborId])
            }
            prevNeighborNumber--
        }
    }
  
    if (direction === 'right' || direction === 'both') {
        let nextNeighborNumber = playerNumber + 1
        while (nextNeighborNumber !== playerNumber + amount && nextNeighborNumber !== playerNumber) {
            if (nextNeighborNumber > playerCount) {
                nextNeighborNumber = 1
            }
            const nextNeighborId = Object.keys(players).find(key => players[key].player_number === nextNeighborNumber)
            if (nextNeighborId) {
                neighbors['right'] = neighbors['right'] || []
                neighbors['right'].push(players[nextNeighborId])
            }
            nextNeighborNumber++
        }
    }
  
    return neighbors
  }