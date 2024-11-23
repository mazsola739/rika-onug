export const getSelectableAnyPlayerNumbersWithNoShield = (players, shieldedCards) => {
    const result = []
  
    for (const token in players) {
      const player = players[token]
      if (!shieldedCards.includes(player.player_number)) {
        result.push(player.player_number)
      }
    }
  
    return result
  }