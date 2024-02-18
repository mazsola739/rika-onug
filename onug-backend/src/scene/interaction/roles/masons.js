const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithMatchingTokens, getKeys } = require("../utils")

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
exports.masons = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const masons = getPlayerNumbersWithMatchingTokens(players, tokens)

  tokens.forEach((token) => {
    const player = players[token]
    
    const playerHistory = {
      ...newGameState.actual_scene,
      masons,
    }

    player.player_history = playerHistory
    
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: ['interaction_masons'],
        icon: 'mason',
        masons,
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

  return newGameState
}
