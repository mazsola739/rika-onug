export const getPlayerTokensByPlayerNumber = (players, playerNumbers) => {
    const result = []
  
    playerNumbers.forEach(player => {
      const number = parseInt(player.match(/\d+/)[0])
  
      for (const token in players) {
        if (players[token].player_number === number) {
          result.push(token)
        }
      }
    })
  
    return result
  }