exports.determineTotalPlayers = (totalCharacters, selectedCards) => {
    const hasAlphaWolf = selectedCards.includes(17)
    const hasTemptress = selectedCards.includes(69)

    let totalPlayers
    if (hasAlphaWolf && hasTemptress) {
        totalPlayers = totalCharacters - 5
    } else if (hasAlphaWolf || hasTemptress) {
        totalPlayers = totalCharacters - 4
    } else {
        totalPlayers = totalCharacters - 3
    }

    return Math.max(totalPlayers, 0)
}

exports.getPlayersReadyState = (gameState) => {
    const playerTokens = Object.keys(gameState.players)
    const ready = []
    const notReady = []

    playerTokens.forEach( token => {
        gameState.players[token].ready
        ? ready.push(gameState.players[token].player_number)
        : notReady.push(gameState.players[token].player_number)
      })
    return {ready, notReady}
}
