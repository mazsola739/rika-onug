export const getAnyEvenOrOddPlayerNumbers = (players, evenOrOdd) => {
    const result = []
  
    for (const token in players) {
      const player = players[token]
      const playerNumberValue = parseInt(player.player_number.replace('player_', ''), 10)
  
      if ((evenOrOdd === 'even' && playerNumberValue % 2 === 0) || (evenOrOdd === 'odd' && playerNumberValue % 2 !== 0)) {
        result.push(player.player_number)
      }
    }
  
    return result
  }
  