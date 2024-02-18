const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getTannerNumberByRoleIds, getKeys } = require("../utils")

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
exports.apprenticetanner = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  const tanner = getTannerNumberByRoleIds(players)

  tokens.forEach((token) => {
    const player = players[token]

    const playerHistory = {
      ...newGameState.actual_scene,
      tanner: tanner,
    }
    player.player_history = playerHistory
    
    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped;

    

role_interactions.push({
      type: INTERACTION,
      title,
      token,
      informations: {
        message: ['interaction_tanner'],
        icon: 'tanner',
        tanner,
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
