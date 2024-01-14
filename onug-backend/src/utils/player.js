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
