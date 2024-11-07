export const getSelectablePlayersWithNoShield = (players, shieldedCards) => players.filter(player => !shieldedCards.includes(player))
