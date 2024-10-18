
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

export const getGameTableBoard = gamestate => {
  const playersPrivate = Object.values(gamestate.players)

  const playersPublic = playersPrivate.map((player) => {
    return {
      player_number: `player_${player.player_number}`,
      player_name: player.name,
      ready: player.ready,
    }
  })
  
  const cardsOnBoard = Object.keys(gamestate?.card_positions).map(
    (position) => {
      const currentPlayer = playersPublic.find((player) => player.player_number === position)
      const playerCard = gamestate.card_positions[position].card
      if (playerCard.id > 0) {
        const card = { id: 0 }
        const ready = currentPlayer ? currentPlayer.ready : false

        return { position, card, ready }
      } else {
        return { position, card: { id: null }, ready: false }
      }
    }
  )

  return {
    players: playersPublic,
    gameTableBoardCards: cardsOnBoard,
  }
}

export const getGamePlayBoard = gamestate => {
  const cardsOnBoard = Object.keys(gamestate?.card_positions).map(
    (position) => {
      const playerCard = gamestate.card_positions[position].card
      if (playerCard.id > 0) {
        const card = { id: 0 }
        const flippedCard = gamestate.flipped.find((flippedCard) => flippedCard[position])
        if (flippedCard) {
          card.id = flippedCard[position]
        }
        if (gamestate.artifact.includes(position)) {
          card.artifact = true
        }
        if (gamestate.shield.includes(position)) {
          card.shield = true
        }

        return { position, card }
      } else {
        return { position, card: { id: null } }
      }
    }
  )

  return {
    gamePlayBoardCards: cardsOnBoard,
  }
}
