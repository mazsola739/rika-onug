const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens , getKeys } = require("../utils")

//TODO doppelganger
//? INFO: Apprentice Assassin - Wakes up to see who the Assassin is he can only win if the Assassin  dies. If there is no Assassin, he becomes the Assassin
//! NO flipped card but shield
exports.apprenticeassassin = (gameState, tokens) => {
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
    const flippedCards = newGameState.flipped;
  
  
    role_interactions.push({
      type: INTERACTION,
      title: "",
      token,
      message: "interaction_",
      
      shielded_cards: newGameState.shield,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
