import { werewolvesAndDreamWolfIds } from './constants'
import _ from 'lodash'
import artifacts from '../data/artifacts.json'
import { teamIds } from './constants'

export const getRolesNames = (selectedCardIds, actionIds, roles) => selectedCardIds.filter((id) => actionIds.includes(id)).map((id) => roles[id])

export const getTeamName = (id) => {
  for (const key in teamIds) {
    if (teamIds[key].includes(id)) {
      return key
    }
  }

  return "villager"
}

export const shufflePlayers = (totalPlayers) => Array.from({ length: totalPlayers }, (_, i) => `identifier_player${i + 1}_text`).sort(() => 0.5 - Math.random())

export const pickRandomOnePlayer = (numPlayers) => shufflePlayers(numPlayers)[0]

export const pickRandomTwoPlayers = (numPlayers, conjunction) => {
  const players = shufflePlayers(numPlayers)

  return [players[0], conjunction, players[1]]
}

export const pickRandomTwoPlayersArray = (numPlayers) => {
  const players = shufflePlayers(numPlayers)

  return [players[0], players[1]]
}

export const getMadScientistPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    if (players[token].card.player_role_id === 63) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

export const getTannerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    if (players[token].card.player_role_id === 10) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

export const getWerewolfAndDreamwolfPlayerNumbersByRoleIds = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (werewolvesAndDreamWolfIds.includes(player.card.player_role_id)) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}


export const getPlayerNumbersWithMatchingTokens = (players, tokens) => tokens.map(token => `player_${players[token].player_number}`)

export const getPlayerNumbersWithNonMatchingTokens = (players, tokens) => {
  return Object.keys(players)
    .filter((token) => {
      const player = players[token]
      return !tokens.includes(token) && !(player.card?.shield)
    })
    .map((token) => `player_${players[token].player_number}`)
}

export const getCardIdsByPlayerNumbers = (cardPositions, playerNumbers) => {
  const result = []

  playerNumbers.forEach(key => {
    const cardId = cardPositions[key].id
    result.push({ [key]: cardId })
  })

  return result
}

export const getPlayerTokensByPlayerNumber = (players, player) => {
  const result = []
  const playerNumber = parseInt(player.match(/\d+/)[0])

  for (const token in players) {
    if (players[token].player_number === playerNumber) {
      result.push(token)
    }
  }

  return result
}

export const getPlayerTokenByPlayerNumber = (players, player) => {
  const playerNumber = parseInt(player.match(/\d+/)[0])

  for (const token in players) {
    if (players[token].player_number === playerNumber) {
      return token
    }
  }

  return null
}



export const getPlayerNeighborsByToken = (players, token) => {
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

export const getSelectablePlayersWithNoArtifact = (players, artifacted_cards) => players.filter(player => !artifacted_cards.includes(player))
export const isPlayersCardsFlipped = (flipped, playersPositions) => Object.keys(flipped).some(key => playersPositions.includes(key))
export const isActivePlayersCardsFlipped = (flipped, playersPositions) => playersPositions.some((position) => flipped.some((obj) => Object.keys(obj)[0] === position))
export const concatArraysWithUniqueElements = (array1, array2) => _.uniqWith([...array1, ...array2], _.isEqual)

export const getRandomArtifact = (playerArtifacts) => {
  const assignedArtifacts = playerArtifacts.map(obj => Object.values(obj)[0])
  const availableArtifacts = artifacts.filter(artifact => !assignedArtifacts.includes(artifact.id))
  const randomIndex = Math.floor(Math.random() * availableArtifacts.length)

  return availableArtifacts[randomIndex].id
}

export const getKeys = (array) => array.map(obj => Object.keys(obj)[0])

//TODO do i need this functions?
export const getTokenByCardId = (players, cardId) => {
  for (const token in players) {
    if (players?.[token]?.card.player_card_id === cardId) {
      return token
    }
  }

  return null
}

export const getDoppelgangerTokenByRoleId = (players, roleId) => {
  for (const token in players) {
    if (
      players[token].card.player_role_id === roleId &&
      players[token].card.player_card_id === 1
    ) {
      return token
    }
  }

  return null
}

export const getTokenByOriginalIds = (players, ids) => {
  let result = ""

  for (const token in players) {
    if (ids.includes(players?.[token]?.card.player_original_id)) {
      result = token
    }
  }

  return result
}

export const hasDoppelganger = players => {
  for (const token in players) {
    if (players[token].card.player_card_id === 1) {
      return true
    }
  }

  return false
}

export const getRolePositions = (playerNumbers, roleId) => playerNumbers.map(number => ({ [`player_${number}`]: roleId }))

export const getPlayerCardIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    result.push({ [player]: player.card.player_card_id })
  }

  return result
}

export const getPlayerRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    result.push({ [player]: player.card.player_role_id })
  }

  return result
}

export const containsAllIds = (selectedCardIds, roleIds) => roleIds.every((cardId) => selectedCardIds.includes(cardId))
export const containsAnyIds = (selectedCardIds, roleIds) => roleIds.some((cardId) => selectedCardIds.includes(cardId))

export const getTokensByOriginalIds = (players, ids) => {
  const result = []

  for (const token in players) {
    if (ids.includes(players?.[token]?.card.player_original_id)) {
      result.push(token)
    }
  }

  return result
}

export const getTokensByRoleIds = (players, ids) => {
  const result = []

  for (const token in players) {
    if (ids.includes(players?.[token]?.card.player_role_id)) {
      result.push(token)
    }
  }

  return result
}

export const getPlayersWithFlippedCards = (players, flipped) => {
  const flippedCardIds = flipped.map(card => Object.values(card)[0])
  const flippedPlayers = []

  for (const token in players) {
    const originalId = players[token].card.player_original_id
    if (flippedCardIds.includes(originalId)) {
      flippedPlayers.push(token)
    }
  }

  return flippedPlayers
}
