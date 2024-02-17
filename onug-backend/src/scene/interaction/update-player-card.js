const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("./utils")

exports.updatePlayerCard = (newGameState, token) => {
    const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const player = newGameState.players[token]
    const flippedCards = newGameState.flipped
  
    const playerCard = player?.card
    const currentCard = newGameState.card_positions[currentPlayerNumber[0]]
  
    if (!playerCard || !currentCard) return
  
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(flippedCards, currentPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(flippedCards, currentPlayerNumber)
  
    if (iSeeMyCardIsFlipped) {
      playerCard.player_card_id = currentCard.id
      playerCard.player_role_id = currentCard.id
      playerCard.player_role = currentCard.role
      playerCard.player_team = currentCard.team
    } else if (iSeeMyCardElsewhere) {
      playerCard.player_card_id = 0
    }
  }