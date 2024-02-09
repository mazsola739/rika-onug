const { teamIds } = require("./constants")

const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min

exports.getRandomItemFromArray = (array) => array[getRandomNumber(0, array.length - 1)]

exports.hasRole = (selectedCards, roleId) => selectedCards.includes(roleId)

exports.containsAnyIds = (players, ids) => ids.some(id => Object.values(players).some(player => player.card.original_id === id))

exports.containsAllIds = (players, ids) => ids.every(id => Object.values(players).some(player => player.card.original_id === id))

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
  return Object.keys(players);
}

exports.getRolesNames = (selectedCardIds, actionIds, roles) => {
  const commonIds = selectedCardIds.filter((id) => actionIds.includes(id))
  const roleNames = commonIds.map((id) => roles[id])

  return roleNames
}

exports.getTeamName = (id) => {
  for (const key in teamIds) {
    if (teamIds[key].includes(id)) {
      return key
    }
  }

  return "villager"
}

const shufflePlayers = (totalPlayers) => Array.from({ length: totalPlayers }, (_, i) => `identifier_player${i + 1}_text`)
  .sort(() => 0.5 - Math.random())

exports.pickRandomUpToThreePlayers = (totalPlayers, conjunction) => {
  const shuffledPlayers = shufflePlayers(totalPlayers)
  const selectedPlayers = ~~(Math.random() * 3) + 1

  return selectedPlayers > 1
    ? [...shuffledPlayers.slice(0, -1), conjunction, shuffledPlayers.slice(-1)[0]]
    : shuffledPlayers
}
