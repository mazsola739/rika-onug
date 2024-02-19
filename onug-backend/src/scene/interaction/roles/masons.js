const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { getPlayerNumbersWithMatchingTokens } = require("../utils")

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
exports.masons = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const { players } = newGameState
    const masons = getPlayerNumbersWithMatchingTokens(players, tokens)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_masons'],
        'mason',
        null,
        null,
        null,
        null,
        { masons, },
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      masons,
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}
