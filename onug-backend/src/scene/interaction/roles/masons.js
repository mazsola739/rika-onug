const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithMatchingTokens, getKeys } = require("../utils")

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
exports.masons = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const masons = getPlayerNumbersWithMatchingTokens(players, tokens)

  tokens.forEach((token) => {
    const player = players[token]
    
    const roleHistory = {
      ...newGameState.actual_scene,
      masons,
    }

    player.role_history = roleHistory
    
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    role_interactions.push({
      type: INTERACTION,
      title: "MASONS",
      token,
      message: "interaction_masons",
      selectable_card_limit: { player: 0, center: 0 },
      masons,
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })

    newGameState.actual_scene.interaction = `The player ${player.player_number} saw Mason position(s): player ${masons.join(', ')}`
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
