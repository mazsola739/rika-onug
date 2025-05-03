export const getNeighborPlayerNumbersByToken = (players, token) => {
    const tokens = Object.keys(players)
    const playerCount = tokens.length
    const playerNumberString = players[token].player_number
    const currentPlayerIndex = parseInt(playerNumberString.split('_')[1], 10)

    const prevNeighborIndex = currentPlayerIndex === 1 ? playerCount : currentPlayerIndex - 1
    const nextNeighborIndex = currentPlayerIndex === playerCount ? 1 : currentPlayerIndex + 1

    const prevNeighbor = `player_${prevNeighborIndex}`
    const nextNeighbor = `player_${nextNeighborIndex}`

    return [prevNeighbor, nextNeighbor]
}
