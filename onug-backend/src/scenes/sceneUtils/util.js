export const getPlayerNumbersWithMatchingTokens = (players, tokens) => tokens.map(token => players[token].player_number)
export const getPlayerNumbersWithNonMatchingTokens = (players, tokens) => {
  return Object.keys(players)
    .filter(token => {
      return !tokens.includes(token)
    })
    .map(token => players[token].player_number)
}
export const getPlayerNumberWithMatchingToken = (players, token) => players[token].player_number
export const getPlayerTokenByPlayerNumber = (players, playerNumber) => {
  for (const token in players) {
    if (players[token].player_number === playerNumber) {
      return token
    }
  }
  return null
}
export const getPlayerTokensByPlayerNumber = (players, playerNumbers) => {
  const result = []

  playerNumbers.forEach(playerNumber => {
    for (const token in players) {
      if (players[token].player_number === playerNumber) {
        result.push(token)
      }
    }
  })

  return result
}
export const getPlayerNeighborsByToken = (players, token, direction, amount) => {
  const tokens = Object.keys(players)
  const playerCount = tokens.length
  const currentPlayerNumber = parseInt(players[token].player_number.split('_')[1], 10)
  const neighbors = { left: [], right: [] }

  if (direction === 'left' || direction === 'both') {
    let prevNeighborNumber = currentPlayerNumber
    for (let i = 0; i < amount; i++) {
      prevNeighborNumber = ((prevNeighborNumber - 2 + playerCount) % playerCount) + 1
      neighbors.left.push(`player_${prevNeighborNumber}`)
    }
  }

  if (direction === 'right' || direction === 'both') {
    let nextNeighborNumber = currentPlayerNumber
    for (let i = 0; i < amount; i++) {
      nextNeighborNumber = (nextNeighborNumber % playerCount) + 1
      neighbors.right.push(`player_${nextNeighborNumber}`)
    }
  }

  return neighbors
}
export const getPartOfGroupByToken = (players, token, randomInstruction) => {
  const tokens = Object.keys(players)
  const totalPlayers = tokens.length

  const groupHeadsNumber = parseInt(players[token].player_number.split('_')[1], 10)
  const partOfGroup = [`player_${groupHeadsNumber}`]

  const side = randomInstruction.includes('left') ? 'left' : randomInstruction.includes('right') ? 'right' : 'each'
  const amount = randomInstruction.includes('4') ? 4 : randomInstruction.includes('3') ? 3 : randomInstruction.includes('2') ? 2 : 1

  const getPartOfGroupNumber = index => {
    let partOfGroupNumber = groupHeadsNumber + index
    if (partOfGroupNumber <= 0) {
      partOfGroupNumber += totalPlayers
    } else if (partOfGroupNumber > totalPlayers) {
      partOfGroupNumber -= totalPlayers
    }
    return partOfGroupNumber
  }

  if (side === 'each' || side === 'left') {
    for (let i = 1; i <= amount; i++) {
      const partOfGroupLeftSideNumber = getPartOfGroupNumber(-i)
      partOfGroup.push(`player_${partOfGroupLeftSideNumber}`)
    }
  }

  if (side === 'each' || side === 'right') {
    for (let i = 1; i <= amount; i++) {
      const partOfGroupRightSideNumber = getPartOfGroupNumber(i)
      partOfGroup.push(`player_${partOfGroupRightSideNumber}`)
    }
  }

  return partOfGroup
}
export const getNonAlienPlayerNumbersWithNoShield = (players, aliens, shieldedCards) => players.filter(player => !aliens.includes(player) && !shieldedCards.includes(player))
export const getNeighborPlayerNumbersByToken = (players, token) => {
  const tokens = Object.keys(players)
  const playerCount = tokens.length
  const playerNumberString = players[token].player_number
  const currentPlayerIndex = parseInt(playerNumberString.split('_')[1], 10)

  const prevNeighborIndex = currentPlayerIndex === 1 ? playerCount : currentPlayerIndex - 1
  const nextNeighborIndex = currentPlayerIndex === playerCount ? 1 : currentPlayerIndex + 1

  const prevNeighbor = `player_${prevNeighborIndex}`
  const nextNeighbor = `player_${nextNeighborIndex}`

  return [prevNeighbor, nextNeighbor]
}

export const getNeighborByPosition = (players, currentPlayerNumber, direction) => {
  const currentPlayer = players.indexOf(currentPlayerNumber)
  let neighborIndex

  if (direction === 'left') {
    neighborIndex = (currentPlayer - 1 + players.length) % players.length
  } else if (direction === 'right') {
    neighborIndex = (currentPlayer + 1) % players.length
  }

  return players[neighborIndex]
}
export const getEmpathTokensByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.card.player_role_id === 77 && player.card.player_original_id !== 1) {
      result.push(token)
    }
  }

  return result
}
export const getDoppelgangerEmpathTokensByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.card.player_role_id === 77 && player.card.player_original_id === 1) {
      result.push(token)
    }
  }

  return result
}
export const getAnyOtherPlayersByToken = (players, token) => {
  const result = {}

  for (const player in players) {
    if (player !== token) {
      result[player] = players[player]
    }
  }

  return result
}
export const getAnyHigherOrLowerPlayerNumbersByToken = (players, token, higherOrLower) => {
  const playerNumber = parseInt(players[token].player_number.replace('player_', ''), 10)
  const result = {}

  if (higherOrLower === 'lower') {
    for (let i = playerNumber - 1; i >= 1; i--) {
      result[i] = players[Object.keys(players).find(key => players[key].player_number === `player_${i}`)]
    }
  } else if (higherOrLower === 'higher') {
    const totalPlayers = Object.keys(players).length
    for (let i = playerNumber + 1; i <= totalPlayers; i++) {
      result[i] = players[Object.keys(players).find(key => players[key].player_number === `player_${i}`)]
    }
  }

  return result
}
export const getAllPlayerTokens = players => Object.keys(players)

