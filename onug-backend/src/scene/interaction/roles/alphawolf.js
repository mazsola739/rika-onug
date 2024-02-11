const { INTERACTION } = require("../../../constant/ws")
const { getNonWerewolfPlayerNumbersByRoleIds } = require("../utils")

//? INFO: Alpha Wolf - Wakes with other Werewolves. Wakes after and exchanges the center Alpha card with any other non-Werewolf player card
exports.alphawolf = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(newGameState.players)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
  }

    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card_or_mark_action = false

  role_interactions.push({
    type: INTERACTION,
    title: "ALPHA_WOLF",
    token,
    message: "interaction_alphawolf",
    selectable_cards: selectablePlayerNumbers,
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.alphawolf_response = (gameState, token, selected_positions) => {
  if (selected_positions.every(position => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  
  const newGameState = {...gameState}
  const role_interactions = []

  [newGameState.card_positions.center_wolf, newGameState.card_positions[selected_positions[0]]] = [newGameState.card_positions[selected_positions[0]], newGameState.card_positions.center_wolf,]

  newGameState.players[token].role_history.swapped_cards = [selected_positions[0], "center wolf"]
  newGameState.players[token].role_history.card_or_mark_action = true
  
  role_interactions.push({
    type: INTERACTION,
    title: "ALPHA_WOLF",
    token,
    message: "interaction_alphawolf2",
    swapped_cards: [selected_positions[0], "center wolf"],
    shielded_players: newGameState.shield,
  })
  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped cards between positions: player ${selected_positions[0]} and center wolf`

  return newGameState
}
