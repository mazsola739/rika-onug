//@ts-check
import { werewolvesAndDreamWolfIds, werewolvesIds } from "../constant"
import artifacts from '../data/artifacts.json'
import _ from 'lodash'

const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min

const shufflePlayers = (totalPlayers) => Array.from({ length: totalPlayers }, (_, i) => `identifier_player${i + 1}_text`).sort(() => 0.5 - Math.random())


export const getAllPlayerTokens = (players) => Object.keys(players)

//CONDITION
export const containsAllIds = (selectedCardIds, roleIds) => roleIds.every((cardId) => selectedCardIds.includes(cardId))
export const containsAnyIds = (selectedCardIds, roleIds) => roleIds.some((cardId) => selectedCardIds.includes(cardId))


//NARRATION
export const pickRandomUpToThreePlayers = (totalPlayers, conjunction) => {
  const players = shufflePlayers(totalPlayers)
  const selectedPlayers = ~~(Math.random() * 3) + 1

  return selectedPlayers > 1 ? [...players.slice(0, -1), conjunction, players.slice(-1)[0]] : players
}
export const getRandomItemFromArray = (array) => array[getRandomNumber(0, array.length - 1)]

//SCENE
export const getSelectableOtherPlayersWithoutShield = (players, token) => {
  const result = [];
  Object.keys(players).forEach((playerToken) => {
    if (playerToken !== token && players[playerToken].card.shield !== true) {
      result.push(`player_${players[playerToken].player_number}`);
    }
  });
  return result;
};

export const getCardIdsByPositions = (cardPositions, selectedPositions) => {
  const result = []

  selectedPositions.forEach(position => {
    const cardId = cardPositions[position].id
    result.push({ [position]: cardId })
  })

  return result
}

export const getNonWerewolfPlayerNumbersByRoleIds = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!werewolvesAndDreamWolfIds.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

export const getWerewolfPlayerNumbersByRoleIds = (players) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (werewolvesIds.includes(player.card.player_role_id)) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
}

export const getDreamWolfPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    if (players[token].card.player_role_id === 21) {
      result.push(`player_${players[token].player_number}`)
    }
  }

  return result
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

export const getSelectablePlayersWithNoShield = (players, shielded_cards) => players.filter(player => !shielded_cards.includes(player))
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

//RIPPLE
export const pickRandomOnePlayer = (numPlayers) => shufflePlayers(numPlayers)[0]

export const pickRandomTwoPlayers = (numPlayers, conjunction) => {
  const players = shufflePlayers(numPlayers)

  return [players[0], conjunction, players[1]]
}

export const pickRandomTwoPlayersArray = (numPlayers) => {
  const players = shufflePlayers(numPlayers)

  return [players[0], players[1]]
}