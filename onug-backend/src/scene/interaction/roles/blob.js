const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens , getKeys } = require("../utils")

//TODO doppelganger same result as blob
//! NEM KEL FEL, BLOB-NAK AZ ICON-T
//? INFO: Blob -  Wins if no player part of him (left, right or both), via app, dies
exports.blob = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  
  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);

  tokens.forEach((token) => {
    const player = players[token]
    const roleHistory = {
      ...newGameState.actual_scene,
    }
  
    newGameState.players[token].role_history = roleHistory
      
  
  
    role_interactions.push({
      type: INTERACTION,
      title,
      token,
      message: [""],
      
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
