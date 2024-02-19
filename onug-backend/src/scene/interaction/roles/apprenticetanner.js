const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { getTannerNumberByRoleIds } = require("../utils")

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
exports.apprenticetanner = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    const { players, actual_scene } = newGameState
    const tanner = getTannerNumberByRoleIds(players)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_tanner'],
        'tanner',
        null,
        null,
        null,
        null,
        tanner
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      tanner
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}
