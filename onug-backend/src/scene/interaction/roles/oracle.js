const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens , getKeys } = require("../utils")

//? INFO: Oracle - App asks her a question, she enters it on the app, when then reveals what she did to everyone
//! At this moment oracle never see flipped or shielded cards, ripple different
//* No doppelganger
exports.oracle = (gameState, tokens) => {
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
  
  const oraclePlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

  return newGameState
}

//TODO
exports.oracle_response = (gameState, tokens) => {
  
  const newGameState = { ...gameState }
  const role_interactions = []
  
  return newGameState
}
