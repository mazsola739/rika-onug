export const getNeighborByPosition = (players, currentPlayerNumber, direction) => {
    const currentPlayer = players.indexOf(currentPlayerNumber)
    let neighborIndex

    if (direction === 'left') {
        neighborIndex = (currentPlayer - 1 + players.length) % players.length
    } else if (direction === 'right') {
        neighborIndex = (currentPlayer + 1) % players.length
    }

    return players[neighborIndex]
}
