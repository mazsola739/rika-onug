const { werewolvesAndDreamWolfIds } = require("./constants")

exports.hasDoppelganger = players => {
  for (const token in players) {
    if (players[token].card.id === 1) {
      return true
    }
  }

  return false
}

exports.getTokensByCardIds = (players, cardIds) => {
  const result = []

  for (const token in players) {
    if (cardIds.includes(players?.[token]?.card.id)) {
      result.push(token)
    }
  }

  return result
}

exports.getTokensByRoleIds = (players, roleIds) => {
  const result = []

  for (const token in players) {
    if (roleIds.includes(players?.[token]?.card?.role_id)) {
      result.push(token)
    }
  }

  return result
}

exports.getDoppelgangerTokenByRoleIds = (players, roleIds) => {
  const result = []

  for (const token in players) {
    if (players[token].card.role_id === 1) {
      if (roleIds.includes(players[token].card.role_id) && players[token].card.id === 1) {
        result.push(token)
      }
    }
  }

  return result
}

exports.getDreamWolfPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    if (players[token].card.role_id === 21) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

exports.getTannerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    if (players[token].card.role_id === 10) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

exports.getDreamWolfPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    if (players[token].card.role_id === 21) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

exports.getNonWerewolfPlayerNumbersByRoleIds = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!werewolvesAndDreamWolfIds.includes(player.card.role_id)) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

exports.getPlayerNumbersWithMatchingTokens = (players, tokens) => tokens.map(token => `player_${players[token].player_number}`)

exports.getPlayerNumbersWithNonMatchingTokens = (players, tokens) => {
  return Object.keys(players)
    .filter((token) => {
      const player = players[token]
      return !tokens.includes(token) && !(player.card?.shield)
    })
    .map((token) => `player_${players[token].player_number}`)
}

exports.getCardIdsByPlayerNumbers = (cardPositions, playerNumbers) => {
  const result = []

  playerNumbers.forEach(key => {
    const cardId = cardPositions[key].id
    result.push({ [key]: cardId })
  })

  return result
}

exports.getRolePositions = (playerNumbers, roleId) => playerNumbers.map(number => ({ [`player_${number}`]: roleId }))

exports.getCardIdsByPositions = (cardPositions, selectedPositions) => {
  const result = []

  selectedPositions.forEach(position => {
    const cardId = cardPositions[position].id
    result.push({ [position]: cardId })
  })

  return result
}

exports.getPlayerTokenByPlayerNumber = (players, player) => {
  const result = []
  const playerNumber = parseInt(player.match(/\d+/)[0])

  for (const token in players) {
    if (players[token].player_number === playerNumber) {
      result.push(token)
    }
  }

  return result
}

exports.getPlayerCardIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    result.push({ [player]: player.card.id })
  }

  return result
}

exports.getPlayerRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    result.push({ [player]: player.card.role_id })
  }

  return result
}

exports.containsAllIds = (selectedCardIds, roleIds) => roleIds.every((cardId) => selectedCardIds.includes(cardId))

exports.containsAnyIds = (selectedCardIds, roleIds) => roleIds.some((cardId) => selectedCardIds.includes(cardId))

exports.getTokenByOriginalIds = (players, ids) => {
  let result = ""

  for (const token in players) {
    if (ids.includes(players?.[token]?.card.original_id)) {
      result = token
    }
  }

  return result
}

exports.getTokensByOriginalIds = (players, ids) => {
  const result = []

  for (const token in players) {
    if (ids.includes(players?.[token]?.card.original_id)) {
      result.push(token)
    }
  }

  return result
}

exports.getAllPlayerTokens = (players) => {
  return Object.keys(players)
}

exports.getPlayerNeighborsByToken = (players, token) => {
  const tokens = Object.keys(players)
  const playerCount = tokens.length
  const playerNumber = players[token].player_number
  const neighbors = []

  const prevNeighborNumber = playerNumber === 1 ? playerCount : playerNumber - 1
  const nextNeighborNumber = playerNumber === playerCount ? 1 : playerNumber + 1

  neighbors.push(`player_${prevNeighborNumber}`)
  neighbors.push(`player_${nextNeighborNumber}`)

  return neighbors
}