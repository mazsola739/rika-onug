const { INTERACTION } = require("../../../constant/ws")
const { getTannerNumberByRoleIds } = require("../utils")

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
exports.apprenticetanner = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const tannerPlayerNumbers = getTannerNumberByRoleIds(newGameState.players)

  const roleHistory = {
    ...newGameState.actual_scene,
    card_or_mark_action: false,
  }

  newGameState.players[token].role_history = roleHistory

  role_interactions.push({
    type: INTERACTION,
    title: "APPRENTICE_TANNER",
    token,
    message: "interaction_apprenticetanner",
    tanner: tannerPlayerNumbers,
    shielded_players: newGameState.shield,
  })

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw tanner position(s): player ${tannerPlayerNumbers.join(', ')}`

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState
}
