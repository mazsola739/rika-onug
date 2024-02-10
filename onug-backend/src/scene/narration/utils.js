const { teamIds } = require("./constants")

const getRandomNumber = (min, max) => ~~(Math.random() * (max - min + 1)) + min

exports.getRandomItemFromArray = (array) => array[getRandomNumber(0, array.length - 1)]

exports.getRolesNames = (selectedCardIds, actionIds, roles) => selectedCardIds.filter((id) => actionIds.includes(id)).map((id) => roles[id])

exports.getTeamName = (id) => {
  for (const key in teamIds) {
    if (teamIds[key].includes(id)) {
      return key
    }
  }

  return "villager"
}

exports.shufflePlayers = (totalPlayers) => Array.from({ length: totalPlayers }, (_, i) => `identifier_player${i + 1}_text`).sort(() => 0.5 - Math.random())

exports.pickRandomUpToThreePlayers = (totalPlayers, conjunction) => {
  const players = shufflePlayers(totalPlayers)
  const selectedPlayers = ~~(Math.random() * 3) + 1

  return selectedPlayers > 1 ? [...players.slice(0, -1), conjunction, players.slice(-1)[0]] : players
}

exports.pickRandomOnePlayer = (numPlayers) => shufflePlayers(numPlayers)[0];

exports.pickRandomTwoPlayers = (numPlayers, conjunction) => {
  const players = shufflePlayers(numPlayers);

  return [players[0], conjunction, players[1]]
};

exports.pickRandomTwoPlayersArray = (numPlayers) => {
  const players = shufflePlayers(numPlayers);

  return [players[0], players[1]]
};


