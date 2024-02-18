const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens , getKeys } = require("../utils")

//TODO doppelganger
//? INFO: The Count - Gives a non-Vampire the Mark of Fear; this prevents that player from doing their night action
//! NO flipped card but shield
exports.thecount = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const player = players[token]
    const roleHistory = {
      ...newGameState.actual_scene,
    }
  
    newGameState.players[token].role_history = roleHistory
      
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped
  
    role_interactions.push({
      type: INTERACTION,
      title,
      token,
      message: [""],
      
      shielded_cards: newGameState.shield,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  newGameState.role_interactions = role_interactions
  
  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

  return newGameState
}

exports.thecount_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  return newGameState
}
