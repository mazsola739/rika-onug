export const getNonAlienPlayerNumbersWithNoShield = (players, aliens, shieldedCards) =>
    players.filter(player => !aliens.includes(player) && !shieldedCards.includes(player))
