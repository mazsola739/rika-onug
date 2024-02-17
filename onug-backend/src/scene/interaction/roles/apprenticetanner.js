const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getTannerNumberByRoleIds, getKeys } = require("../utils")

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
exports.apprenticetanner = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const tanner = getTannerNumberByRoleIds(players)

  tokens.forEach((token) => {
    const player = players[token]

    const roleHistory = {
      ...newGameState.actual_scene,
      tanner: tanner,
    }
    player.role_history = roleHistory
    
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped;

    role_interactions.push({
      type: INTERACTION,
      title: "APPRENTICE_TANNER",
      token,
      message: "interaction_apprentice_tanner",
      selectable_card_limit: { player: 0, center: 0 },
      tanner,
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
