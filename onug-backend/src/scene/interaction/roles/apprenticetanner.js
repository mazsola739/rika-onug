const { INTERACTION } = require("../../../constant/ws")
const { getTannerNumberByRoleIds } = require("../utils")

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
exports.apprenticetanner = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const tannerPlayerNumbers = getTannerNumberByRoleIds(newGameState.players)

  const roleHistory = {
    ...newGameState.actual_scene,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  const alphawolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumbers)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumbers)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[alphawolfPlayerNumbers[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[alphawolfPlayerNumbers[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[alphawolfPlayerNumbers[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[alphawolfPlayerNumbers[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "APPRENTICE_TANNER",
    token,
    message: "interaction_apprenticetanner",
    tanner: tannerPlayerNumbers,
    shielded_players: newGameState.shield,
  })

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw the position(s) of Tanner(s): ${tannerPlayerNumbers.join(", ")}`

  newGameState.role_interactions = role_interactions

  return newGameState
}
