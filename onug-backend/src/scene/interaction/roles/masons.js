const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped , getKeys } = require("../utils")

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
exports.masons = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const masons = getPlayerNumbersWithMatchingTokens(players, tokens)

  tokens.forEach((token) => {
    const player = players[token]
    const flippedCards = newGameState.flipped
    
    const roleHistory = {
      ...newGameState.actual_scene,
      masons,
    }

    player.role_history = roleHistory
    
    updatePlayerCard(newGameState, token)

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
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })

    newGameState.actual_scene.interaction = `The player ${player.player_number} saw Mason position(s): player ${masons.join(', ')}`
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
