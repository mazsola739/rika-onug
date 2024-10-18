import { IDS } from "../../../constants"

export const findUniqueElementsInArrays = (array1, array2) => {
  const set = new Set(array1)
  const uniqueFromArray2 = array2.filter(item => !set.has(item))
  const uniqueFromArray1 = array1.filter(item => !array2.includes(item))
  const uniqueElements = uniqueFromArray1.concat(uniqueFromArray2)

  return uniqueElements
}

export const getAlienPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (IDS.ALL_ALIEN_IDS.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
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

export const getSelectableAnyPlayerNumbersWithNoShield = (players) => {
  const result = []

  Object.keys(players).forEach((token) => {
    if (players[token].card.shield !== true) {
      result.push(`player_${players[token].player_number}`)
    }
  })

  return result
}

export const moveCards = (cards, direction, movablePlayers) => {
  const playerCards = Object.fromEntries(Object.entries(cards).filter(([key]) => key.startsWith("player_")))
  const staticCards = Object.fromEntries(Object.entries(playerCards).filter(([key]) => !movablePlayers.includes(key)))
  const movableCards = {}
  movablePlayers.forEach(player => {
    movableCards[player] = playerCards[player]
  })

  const shiftAmount = direction === 'right' ? 1 : Object.keys(movableCards).length - 1

  const shiftedCards = {}
  Object.keys(movableCards).forEach((key, index) => {
    const newIndex = (index + shiftAmount) % Object.keys(movableCards).length
    shiftedCards[`player_${newIndex + 2}`] = { mark: cards[`player_${newIndex + 2}`].mark }
    shiftedCards[`player_${newIndex + 2}`].card = movableCards[key].card
  })

  const updatedPlayerCards = { ...shiftedCards, ...staticCards }

  return updatedPlayerCards
}