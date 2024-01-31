const { werewolvesAndDreamWolfIds } = require("./constants");

exports.hasDoppelganger = players => {
  for (const token in players) {
    if (players[token].card.id === 1) {
      return true;
    }
  }
  
  return false;
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

exports.getTokensByCardIds = (players, cardIds) => {
  const result = []

  for (const token in players) {
    if (players.hasOwnProperty(token)) {
      const player = players[token]
      if (cardIds.includes(player.card.id)) {
        result.push(token)
      }
    }
  }

  return result
}

exports.getTokensByRoleIds = (players, roleIds) => {
  const result = []

  for (const token in players) {
    if (players.hasOwnProperty(token)) {
      const player = players[token]
      if (roleIds.includes(player.card.role_id)) {
        result.push(token)
      }
    }
  }

  return result
}

exports.getDoppelgangerTokenByRoleIds = (players, roleIds) => {
  const result = []

  for (const token in players) {
    if (players[token].card.role_id === 21) {
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

exports.getPlayerNumbersWithNonMatchingTokens = (players, tokens) => Object.keys(players)
  .filter((token) => !tokens.includes(token))
  .map((token) => `player_${players[token].player_number}`)

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
