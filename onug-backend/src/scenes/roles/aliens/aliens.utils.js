import { ALL_ALIEN } from '../../../constants'

export const getCowPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 45) {
      result.push(player.player_number)
    }
  }

  return result
}


export const findUniqueElementsInArrays = (array1, array2) => {
  const set = new Set(array1)
  const uniqueFromArray2 = array2.filter(item => !set.has(item))
  const uniqueFromArray1 = array1.filter(item => !array2.includes(item))
  const uniqueElements = uniqueFromArray1.concat(uniqueFromArray2)

  return uniqueElements
}

export const getAlienPlayerNumbersByRoleIdsWithNoShield = (players, shieldedCards) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (ALL_ALIEN.includes(player.card.player_role_id) && !shieldedCards.includes(player.player_number)) {
      result.push(player.player_number)
    }
  }

  return result
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

export const getSelectableAnyPlayerNumbersWithNoShield = (players, shieldedCards) => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!shieldedCards.includes(player.player_number)) {
      result.push(player.player_number)
    }
  }

  return result
}

export const moveCards = (cards, direction, movablePlayers) => {
  const playerCards = Object.fromEntries(Object.entries(cards).filter(([key]) => key.startsWith('player_')))
  const staticCards = Object.fromEntries(Object.entries(playerCards).filter(([key]) => !movablePlayers.includes(key)))
  const movableCards = movablePlayers.map(player => playerCards[player])

  const shiftAmount = direction === 'right' ? 1 : -1

  const shiftedMovableCards = movablePlayers.reduce((acc, _player, index) => {
    const newIndex = (index + shiftAmount + movablePlayers.length) % movablePlayers.length
    acc[movablePlayers[newIndex]] = movableCards[index]
    return acc
  }, {})

  const updatedPlayerCards = { ...playerCards, ...staticCards, ...shiftedMovableCards }

  return updatedPlayerCards
}
