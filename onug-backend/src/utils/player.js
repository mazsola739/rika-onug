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

exports.getBoard = (gameState) => {
  const playersPrivate = Object.values(gameState.players)

  const playersPublic = playersPrivate.map((player) => {
    return {
      player_number: player.player_number,
      player_name: player.name,
      ready: player.ready,
    }
  })
  
  const cardsOnBoard = Object.keys(gameState?.card_positions).map(
    (position) => {
      const card = gameState.card_positions[position]
      if (card.id > 0) {
        const mappedCard = { id: card.id }    //! todo fix don't tell real card id!!!!!
        const flippedCard = gameState.flipped.find(
          (flippedCard) => flippedCard[position]
        )
        if (flippedCard) {
          mappedCard.id = flippedCard[position]
        }
        if (gameState.artifact.includes(position)) {
          mappedCard.artifact = true
        }
        if (gameState.shield.includes(position)) {
          mappedCard.shield = true
        }

        return { [position]: mappedCard }
      }
    }
  )

  return {
    players: playersPublic,
    boardCards: cardsOnBoard,
  }
}
