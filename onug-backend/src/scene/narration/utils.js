const { teamIds } = require("./constants")

const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min

exports.getRandomItemFromArray = (array) =>
  array[getRandomNumber(0, array.length - 1)]

  
exports.hasRole = (selectedCards, roleId) =>  selectedCards.includes(roleId)

exports.containsAllIds = (selectedCardIds, roleIds) =>
  roleIds.every((cardId) => selectedCardIds.includes(cardId))

exports.containsAnyIds = (selectedCardIds, roleIds) =>
  roleIds.some((cardId) => selectedCardIds.includes(cardId))

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
  return null
}

const shufflePlayers = (totalPlayers) =>
  Array.from(
    { length: totalPlayers },
    (_, i) => `identifier_player${i + 1}_text`
  ).sort(() => 0.5 - Math.random())

exports.pickRandomUpToThreePlayers = (totalPlayers, conjunction) => {
  const shuffledPlayers = shufflePlayers(totalPlayers)
  const selectedPlayers = ~~(Math.random() * 3) + 1

  return selectedPlayers > 1
    ? [
        ...shuffledPlayers.slice(0, -1),
        conjunction,
        shuffledPlayers.slice(-1)[0],
      ]
    : shuffledPlayers
}
