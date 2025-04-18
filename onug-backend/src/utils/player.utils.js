export const determineTotalPlayers = (totalCharacters, selectedCards) => {
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

export const getPlayerNames = gamestate => {
  const playersFromGamestate = Object.values(gamestate.players)

  const players = playersFromGamestate.map(player => {
    return {
      player_name: player.name
    }
  })

  return players
}

export const getTableBoard = gamestate => {
  const playersPrivate = Object.values(gamestate.players)

  const playersPublic = playersPrivate.map(player => {
    return {
      player_number: player.player_number,
      player_name: player.name,
      flag: player.flag
    }
  })

  return playersPublic
}

export const getGameBoard = gamestate => {
  const cardsOnBoard = Object.keys(gamestate?.card_positions).map(position => {
    const playerCard = gamestate.card_positions[position].card
    if (playerCard.id > 0) {
      const card = { id: 0 }
      const flippedCard = gamestate.flippe_cards.find(flippedCard => flippedCard[position])
      if (flippedCard) {
        card.id = flippedCard[position]
      }
      if (gamestate.artifacted_cards.includes(position)) {
        card.artifact = true
      }
      if (gamestate.shielded_cards.includes(position)) {
        card.shield = true
      }

      return { position, card }
    } else {
      return { position, card: { id: null } }
    }
  })

  return {
    gamePlayBoardCards: cardsOnBoard
  }
}
