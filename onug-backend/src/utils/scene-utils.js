
import { alienIds, masonIds, supervillainIds, vampireIds, wolfIds, werewolvesIds } from '../constant'
import artifacts from '../data/artifacts.json'
import _ from 'lodash'

export const getRandomItemsFromArray = (array, amount) => {
  const shuffled = array.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, amount)
}

export const findUniqueElementsInArrays = (array1, array2) => {
  const set = new Set(array1)
  const uniqueFromArray2 = array2.filter(item => !set.has(item))
  const uniqueFromArray1 = array1.filter(item => !array2.includes(item))
  const uniqueElements = uniqueFromArray1.concat(uniqueFromArray2)

  return uniqueElements
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


const shufflePlayers = totalPlayers => Array.from({ length: totalPlayers }, (_, i) => `identifier_player${i + 1}_text`).sort(() => 0.5 - Math.random())

export const pickRandomUpToThreePlayers = (totalPlayers, conjunction) => {
    const players = shufflePlayers(totalPlayers)
    const selectedPlayers = ~~(Math.random() * 3) + 1

    return selectedPlayers > 1 ? [...players.slice(0, -1), conjunction, players.slice(-1)[0]] : players
}

//NARRATION
export const getAllPlayerTokens = players => Object.keys(players)

export const getSceneEndTime = (starTime, actionTime) => starTime + (actionTime * 1000)

export const getRandomItemFromArray = array => array[getRandomNumber(0, array.length - 1)]

//PRIVATE MESSAGE
export const formatPlayerIdentifier = playerNumbers => {
  const formattedPlayerNumbers = [...playerNumbers]

  return formattedPlayerNumbers.map(player => `identifier_${player.replace('_', '')}_text`)
}

export const formatOracleAnswer = answer => `${answer}_button_label`

//SPECIAL ROLE UTILS
//oracle
export const createNumberArray = number => {
  const result = []
  for (let i = 1; i <= number; i++) {
    result.push(`${i}`)
  }
  return result
}

export const isCurrentPlayerNumberEven = (players, token) => players[token].player_number % 2 === 0

const getNeighborPlayerNumbersByToken = (players, token) => {
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

export const thinkRandomNumber = () => Math.floor(Math.random() * 10) + 1

export const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min

export const getRandomArtifact = playerArtifacts => {
    const assignedArtifacts = playerArtifacts.map(obj => Object.values(obj)[0])
    const availableArtifacts = artifacts.filter(artifact => !assignedArtifacts.includes(artifact.id))
    const randomIndex = Math.floor(Math.random() * availableArtifacts.length)

    return availableArtifacts[randomIndex].id
}

//evilometer
export const superVillainDetected = (players, evilometerToken) => {
  const evilometerNeighbors = getNeighborPlayerNumbersByToken(players, evilometerToken)
  const superVillains = getVillainPlayerNumbersByRoleIds(players)

  for (let villain of superVillains) {
    if (evilometerNeighbors.has(villain)) {
      return true
    }
  }

  return false
}

//cow
export const alienAbducted = (players, cowToken) => {
  const cowNeighbors = getNeighborPlayerNumbersByToken(players, cowToken)
  const aliens = getAlienPlayerNumbersByRoleIds(players)

  for (let alien of aliens) {
    if (cowNeighbors.has(alien)) {
      return true
    }
  }

  return false
}

//auraseer
export const getPlayerNumbersWithCardOrMarkActionTrue = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.card_or_mark_action === true) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

//rascal
export const moveCardsButYourOwn = (cards, direction, currentPlayer) => {
  const playerCards = Object.fromEntries(
    Object.entries(cards)
      .filter(([key]) => key.startsWith("player_"))
  )

  const movableCards = { ...playerCards }
  const currentPlayerData = movableCards[currentPlayer]
  delete movableCards[currentPlayer]

  const shiftAmount = direction === 'right' ? 1 : Object.keys(movableCards).length - 1

  const shiftedCards = {}
  Object.keys(movableCards).forEach((key, index) => {
    const newIndex = (index + shiftAmount) % Object.keys(movableCards).length
    shiftedCards[`player_${newIndex + 2}`] = {
      mark: cards[`player_${newIndex + 2}`].mark
    }
    shiftedCards[`player_${newIndex + 2}`].card = movableCards[key].card
  })

  const updatedPlayerCards = { ...shiftedCards, [currentPlayer]: currentPlayerData }

  return updatedPlayerCards
}

//lovers
export const getLoversPlayerNumbersByMark = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.player_mark === "mark_of_love") {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

//renfield
export const getVampirePlayerNumbersByMark = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.player_mark === "mark_of_vampire") {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getAnyEvenOrOddPlayers = (players, evenOrOdd) => {
  const result = {}

  for (const playerId in players) {
    const playerNumber = players[playerId].player_number
    const isPlayerNumberEven = playerNumber % 2 === 0
    const isPlayerNumberOdd = playerNumber % 2 !== 0

    if (evenOrOdd === 'even' && isPlayerNumberEven) {
      result[playerId] = players[playerId]
    } else if (evenOrOdd === 'odd' && isPlayerNumberOdd) {
      result[playerId] = players[playerId]
    }
  }

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

//VOTE COUNTING
export const addVote = (playerNumber, selectedPosition, votes) => {
  const updatedVotes = { ...votes }

  if (votes[selectedPosition]) {
    updatedVotes[selectedPosition].push(`player_${playerNumber}`)
  } else {
    updatedVotes[selectedPosition] = [`player_${playerNumber}`]
  }

  return updatedVotes
}

export const removeVote = (playerNumber, selectedPosition, votes) => {
  const updatedVotes = { ...votes }

  if (updatedVotes[selectedPosition]) {
    const index = updatedVotes[selectedPosition].indexOf(`player_${playerNumber}`)
    if (index !== -1) {
      updatedVotes[selectedPosition].splice(index, 1)
      if (updatedVotes[selectedPosition].length === 0) {
        delete updatedVotes[selectedPosition]
      }
    }
  }

  return updatedVotes
}

export const findMostVoted = (votes) => {
  let maxVotes = 0
  let mostVotedPlayers = []

  for (const playerNumber in votes) {
    const voteCount = votes[playerNumber].length

    if (voteCount > maxVotes) {
      maxVotes = voteCount
      mostVotedPlayers = [playerNumber]
    } else if (voteCount === maxVotes) {
      mostVotedPlayers.push(playerNumber)
    }
  }

  return mostVotedPlayers
}

//GET SELECTABLE PLAYERS
export const getSelectableOtherPlayerNumbersWithNoShield = (players, token) => {
  const result = []

  Object.keys(players).forEach((playerToken) => {
    if (playerToken !== token && players[playerToken].card.shield !== true) {
      result.push(`player_${players[playerToken].player_number}`)
    }
  })

  return result
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

export const getSelectablePlayersWithNoShield = (players, shieldedCards) => players.filter(player => !shieldedCards.includes(player))

export const getSelectablePlayersWithNoArtifact = (players, artifactedCards) => players.filter(player => !artifactedCards.includes(player))

//GET BY POSITION
export const getCardIdsByPositions = (cardPositions, selectedPositions) => {
  const result = []

  selectedPositions.forEach(position => {
    const cardId = cardPositions[position].card.id
    result.push({ [position]: cardId })
  })

  return result
}

export const getMarksByPositions = (cardPositions, selectedPositions) => {
  const result = []

  selectedPositions.forEach(position => {
    const mark = cardPositions[position].mark
    result.push({ [position]: mark })
  })

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

//GET BY PLAYER NUMBER
export const getCardIdsByPlayerNumbers = (cardPositions, playerNumbers) => {
  const result = []

  playerNumbers.forEach((key) => {
    const cardId = cardPositions[key].card.id
    result.push({ [key]: cardId })
  })

  return result
}

export const getPlayerTokensByPlayerNumber = (players, playerNumbers) => {
  const result = []

  playerNumbers.forEach(player => {
    const number = parseInt(player.match(/\d+/)[0])

    for (const token in players) {
      if (players[token].player_number === number) {
        result.push(token)
      }
    }
  })

  return result
}

//GET BY ROLE IDS
export const getNonWerewolfPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!wolfIds.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getWerewolfPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (werewolvesIds.includes(player.card.player_role_id)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getDreamWolfPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 21) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getWerewolfAndDreamwolfPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (wolfIds.includes(player.card.player_role_id)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getWerewolfAndDreamwolfPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (wolfIds.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getVillainPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (supervillainIds.includes(player.card.player_role_id)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getNonVillainPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!supervillainIds.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getAlienPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (alienIds.includes(player.card.player_role_id)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getAlienPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (alienIds.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getAlienTokensByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (alienIds.includes(player.card.player_role_id)) {
      result.push(token)
    }
  }

  return result
}

export const getNonAlienPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (!alienIds.includes(player.card.player_role_id) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getGroobPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 47) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getZerbPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 54) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getVampirePlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (vampireIds.includes(player.card.player_role_id)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getVampireTokensByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (vampireIds.includes(player.card.player_role_id)) {
      result.push(token)
    }
  }

  return result
}

export const getNonVampirePlayerNumbersByRoleIds = gameState => {
  const result = []

  for (const token in gameState.players) {
    const player = gameState.players[token]
    const cardPositions = gameState.card_positions
    if (!vampireIds.includes(player.card.player_role_id) && cardPositions[`player_${player.player_number}`].mark !== "mark_of_vampire") {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getMadScientistPlayerNumberByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 63) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getTannerPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 10) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getAssassinPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (players[token].card.player_role_id === 29) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getAnySeerPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (player.card.player_role_id === 9 || player.card.player_role_id === 18) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getAnySeerPlayerNumbersByRoleIdsWithNoShield = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if ((player.card.player_role_id === 9 || player.card.player_role_id === 18) && !(player.card?.shield)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const getMasonPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (masonIds.includes(player.card.player_role_id)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

//GET BY TOKEN
export const getAnyHigherOrLowerPlayerNumbersByToken = (players, token, higherOrLower) => {
  const playerNumber = players[token].player_number
  const result = {}

  if (higherOrLower === 'lower') {
      for (let i = playerNumber - 1; i >= 1; i--) {
          result[i] = players[Object.keys(players).find(key => players[key].player_number === i)]
      }
  } else if (higherOrLower === 'higher') {
      const totalPlayers = Object.keys(players).length
      for (let i = playerNumber + 1; i <= totalPlayers; i++) {
          result[i] = players[Object.keys(players).find(key => players[key].player_number === i)]
      }
  }

  return result
}

export const getPlayerNeighborsByToken = (players, token, direction, amount) => {
  const tokens = Object.keys(players)
  const playerCount = tokens.length
  const playerNumber = players[token].player_number
  const neighbors = {}

  if (direction === 'left' || direction === 'both') {
      let prevNeighborNumber = playerNumber - 1
      while (prevNeighborNumber !== playerNumber - amount && prevNeighborNumber !== playerNumber) {
          if (prevNeighborNumber < 1) {
              prevNeighborNumber = playerCount
          }
          const prevNeighborId = Object.keys(players).find(key => players[key].player_number === prevNeighborNumber)
          if (prevNeighborId) {
              neighbors['left'] = neighbors['left'] || []
              neighbors['left'].push(players[prevNeighborId])
          }
          prevNeighborNumber--
      }
  }

  if (direction === 'right' || direction === 'both') {
      let nextNeighborNumber = playerNumber + 1
      while (nextNeighborNumber !== playerNumber + amount && nextNeighborNumber !== playerNumber) {
          if (nextNeighborNumber > playerCount) {
              nextNeighborNumber = 1
          }
          const nextNeighborId = Object.keys(players).find(key => players[key].player_number === nextNeighborNumber)
          if (nextNeighborId) {
              neighbors['right'] = neighbors['right'] || []
              neighbors['right'].push(players[nextNeighborId])
          }
          nextNeighborNumber++
      }
  }

  return neighbors
}

export const getPartOfGroupByToken = (players, token, randomInstruction) => {
  const tokens = Object.keys(players)
  const totalPlayers = tokens.length
  const groupHeadsNumber = players[token].player_number
  const partOfGroup = [`player_${groupHeadsNumber}`]

  const side = randomInstruction.includes("left") ? "left" : randomInstruction.includes("right") ? "right" : "each"
  const amount = randomInstruction.includes("4") ? 4 : randomInstruction.includes("3") ? 3 : randomInstruction.includes("2") ? 2 : 1

  const getPartOfGroupNumber = (index) => {
      let partOfGroupNumber = groupHeadsNumber + index
      if (partOfGroupNumber <= 0) {
          partOfGroupNumber += totalPlayers
      } else if (partOfGroupNumber > totalPlayers) {
          partOfGroupNumber -= totalPlayers
      }
      return partOfGroupNumber
  }

  if (side === "each" || side === "left") {
      for (let i = 1; i <= amount; i++) {
          const partOfGroupLeftSideNumber = getPartOfGroupNumber(-i)
          partOfGroup.push(`player_${partOfGroupLeftSideNumber}`)
      }
  }

  if (side === "each" || side === "right") {
      for (let i = 1; i <= amount; i++) {
          const partOfGroupRightSideNumber = getPartOfGroupNumber(i)
          partOfGroup.push(`player_${partOfGroupRightSideNumber}`)
      }
  }

  return partOfGroup
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

export const getPlayerNumbersWithMatchingTokens = (players, tokens) => tokens.map(token => `player_${players[token].player_number}`)

export const getPlayerNumberWithMatchingToken = (players, token) => `player_${players[token].player_number}`

export const getPlayerNumbersWithNonMatchingTokens = (players, tokens) => {
  return Object.keys(players)
      .filter((token) => {
          return !tokens.includes(token)
      })
      .map((token) => `player_${players[token].player_number}`)
}

//RIPPLE
export const pickRandomOnePlayer = numPlayers => shufflePlayers(numPlayers)[0]

export const pickRandomTwoPlayers = (numPlayers, conjunction) => {
    const players = shufflePlayers(numPlayers)

    return [players[0], conjunction, players[1]]
}

export const pickRandomTwoPlayersArray = numPlayers => {
    const players = shufflePlayers(numPlayers)

    return [players[0], players[1]]
}