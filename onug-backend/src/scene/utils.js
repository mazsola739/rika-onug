import { werewolvesAndDreamWolfIds, werewolvesIds } from "./constants"

const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min

export const getAllPlayerTokens = (players) => Object.keys(players)

//CONDITION

//NARRATION
export const pickRandomUpToThreePlayers = (totalPlayers, conjunction) => {
  const players = this.shufflePlayers(totalPlayers)
  const selectedPlayers = ~~(Math.random() * 3) + 1

  return selectedPlayers > 1 ? [...players.slice(0, -1), conjunction, players.slice(-1)[0]] : players
}
export const getRandomItemFromArray = (array) => array[getRandomNumber(0, array.length - 1)]

//INTERACTION
export const getSelectableOtherPlayersWithoutShield = (players, token) =>
  Object.keys(players)
    .filter((playerToken) => {
      const player = players[playerToken]
      return playerToken !== token && !player.card?.shield
    })
    .map((playerToken) => `player_${players[playerToken].player_number}`)

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
    if (!werewolvesAndDreamWolfIds.includes(player.card.player_role_id)) {
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
