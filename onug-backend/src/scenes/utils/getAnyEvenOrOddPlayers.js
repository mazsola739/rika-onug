export const getAnyEvenOrOddPlayers = (players, evenOrOdd) => {
    const result = {}
  
    for (const playerId in players) {
      const playerNumber = players[playerId].player_number
      const isPlayerNumberEven = playerNumber % 2 === 0
      const isPlayerNumberOdd = playerNumber % 2 !== 0
  
      if (evenOrOdd === 'even' && isPlayerNumberEven) {
        result[playerId] = players[playerId]
      } else if (evenOrOdd === 'odd' && isPlayerNumberOdd) {
        result[playerId] = players[playerId]
      }
    }
  
    return result
  }