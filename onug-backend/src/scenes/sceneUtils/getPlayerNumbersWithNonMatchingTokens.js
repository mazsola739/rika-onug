export const getPlayerNumbersWithNonMatchingTokens = (players, tokens) => {
    return Object.keys(players)
        .filter(token => !tokens.includes(token))
        .map(token => players[token].player_number)
}
