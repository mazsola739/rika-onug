export const getEmpathTokensByRoleIds = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (
      player.card.player_role_id === 77 &&
      player.card.player_original_id !== 1
    ) {
      result.push(token)
    }
  }

  return result
}

export const getDoppelgangerEmpathTokensByRoleIds = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (
      player.card.player_role_id === 77 &&
      player.card.player_original_id === 1
    ) {
      result.push(token)
    }
  }

  return result
}

export const empathNumbers = (totalPlayers, evenOdd = '') => {
  const numbers = []

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
    numbers.push(i)
  }

  return numbers
}
