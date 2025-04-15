export const empathVotersPlayerNumbers = (totalPlayers, evenOdd = '') => {
    const result = []
  
    totalPlayers = Math.min(Math.max(1, totalPlayers), 12)
  
    let start = 1
    let step = 1
    if (evenOdd === 'even') {
      start = 2
      step = 2
    } else if (evenOdd === 'odd') {
      start = 1
      step = 2
    }
  
    for (let i = start; i <= totalPlayers; i += step) {
      result.push(`player_${i}`)
    }
  
    return result
  }