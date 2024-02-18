const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens , getKeys } = require("../utils")

//TODO doppelganger
//? INFO: Renfield - With their eyes closed, sees who Vampires gave Mark of the Vampire then gives himself Mark of the Bat
//! NO flipped card but shield
exports.renfield = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const player = players[token]
    const playerHistory = {
      ...newGameState.actual_scene,
    }
  
    newGameState.players[token].player_history = playerHistory
      
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped
  
    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: [''],
        icon: '',

        shielded_cards: newGameState.shield,
        artifacted_cards: getKeys(newGameState.artifact),
        show_cards: flippedCards,
      },
      player: {
        player_name: player?.name,
        player_number: player?.player_number,
        ...playerCard,
      },
    })
  })
  newGameState.role_interactions = role_interactions
  
  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);

  return newGameState
}
