const { INTERACTION } = require("../../../constant/ws")
const { werewolvesAndDreamWolfIds } = require("../constants")
const { getPlayerNumbersWithMatchingTokens, getTokensByRoleIds } = require("../utils")

//? INFO: Minion - All Werewolf team (not Minion/Squire) stick up their thumb for him to see
exports.minion = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const werewolfTokens = getTokensByRoleIds(newGameState.players, werewolvesAndDreamWolfIds)
  const werewolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, werewolfTokens)

  const roleHistory = {
    ...newGameState.actual_scene,
    werewolves: werewolfPlayerNumbers,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  role_interactions.push({
    type: INTERACTION,
    title: "MINION",
    token,
    message: "interaction_minion",
    werewolves: werewolfPlayerNumbers,
    shielded_players: newGameState.shield,
  })

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw werewolf position(s): player ${werewolfPlayerNumbers.join(', ')}`

  newGameState.role_interactions = role_interactions

  return newGameState
}
