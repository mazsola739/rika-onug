export const getPlayerNeighborsByToken = (players, token, direction, amount) => {
    const tokens = Object.keys(players)
    const playerCount = tokens.length
    const currentPlayerNumber = parseInt(players[token].player_number.split('_')[1], 10)
    const neighbors = { left: [], right: [] }

    if (direction === 'left' || direction === 'both') {
        let prevNeighborNumber = currentPlayerNumber
        for (let i = 0; i < amount; i++) {
            prevNeighborNumber = ((prevNeighborNumber - 2 + playerCount) % playerCount) + 1
            neighbors.left.push(`player_${prevNeighborNumber}`)
        }
    }

    if (direction === 'right' || direction === 'both') {
        let nextNeighborNumber = currentPlayerNumber
        for (let i = 0; i < amount; i++) {
            nextNeighborNumber = (nextNeighborNumber % playerCount) + 1
            neighbors.right.push(`player_${nextNeighborNumber}`)
        }
    }

    return neighbors
}
