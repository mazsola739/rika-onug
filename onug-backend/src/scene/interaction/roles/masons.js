const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens } = require("../utils")

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
exports.masons = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const masonPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, tokens)

  const roleHistory = {
    ...newGameState.actual_scene,
  }

  tokens.forEach((token) => {
    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card_or_mark_action = false

    role_interactions.push({
      type: INTERACTION,
      title: "MASONS",
      token,
      message: "interaction_masons",
      masons: masonPlayerNumbers,
      shielded_players: newGameState.shield,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw mason position(s): player ${masonPlayerNumbers.join(', ')}`
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}
