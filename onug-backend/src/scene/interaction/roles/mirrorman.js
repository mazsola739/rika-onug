const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, getKeys } = require("../utils")

//! At this moment mirrorman never see flipped or shielded cards, ripple different
exports.mirrorman = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const player = players[token]
    const roleHistory = {
      ...newGameState.actual_scene,
    }
  
    newGameState.players[token].role_history = roleHistory
      
  
    role_interactions.push({
      type: INTERACTION,
      title: "",
      token,
      message: "interaction_",
      
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  newGameState.role_interactions = role_interactions
  
  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);

  return newGameState
}

exports.mirrorman_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  return newGameState
}
