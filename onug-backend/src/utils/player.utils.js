export const determineNeedingPlayerNumbers = (totalCharacters, selectedCards) => {
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

export const getPlayerNames = players => {
  const playersFromGamestate = Object.values(players)

  return playersFromGamestate.map(player => {
    return {
      player_name: player.name
    }
  })
}

export const getNicknames = players => {
  return Object.values(players).map(player => player.name)
}

export const getPublicPlayersInformation = players => {
  const playersPrivate = Object.values(players)

  const playersPublic = playersPrivate.map(player => {
    return {
      player_number: player.player_number,
      player_name: player.name,
      flag: player.flag
    }
  })

  return playersPublic
}

