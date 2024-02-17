const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped, getTannerNumberByRoleIds , getKeys } = require("../utils")

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
exports.apprenticetanner = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const tanner = getTannerNumberByRoleIds(players)

  tokens.forEach((token) => {
    const player = players[token]
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    const roleHistory = {
      ...newGameState.actual_scene,
      tanner,
    }
    player.role_history = roleHistory
    
    updatePlayerCard(newGameState, token);

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
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })
  
    //TODO save multiple
    newGameState.actual_scene.interaction = `The player ${player.player_number} saw the position(s) of Tanner(s): ${tanner(", ")}`
  })
  
  newGameState.role_interactions = role_interactions

  return newGameState
}
