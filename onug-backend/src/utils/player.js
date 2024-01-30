const { logTrace } = require("../log")

exports.determineTotalPlayers = (totalCharacters, selectedCards) => {
  const hasAlphaWolf = selectedCards.includes(17)
  const hasTemptress = selectedCards.includes(69)

  let totalPlayers
  if (hasAlphaWolf && hasTemptress) {
    totalPlayers = totalCharacters - 5
  } else if (hasAlphaWolf || hasTemptress) {
    totalPlayers = totalCharacters - 4
  } else {
    totalPlayers = totalCharacters - 3
  }

  return Math.max(totalPlayers, 0)
}

exports.getBoard = gameState => {
  const playersPrivate = Object.values(gameState.players)

  const playersPublic = playersPrivate.map((player) => {
    return {
      player_number: player.player_number,
      player_name: player.name,
      ready: player.ready,
    }
  })

  const newWolfCard = gameState.newWolfCard
  const newVillainCard = gameState.newVillainCard

  return {
    players: playersPublic,
  }
}

