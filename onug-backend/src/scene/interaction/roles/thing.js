const { getPlayerNeighborsByToken, getPlayerTokenByPlayerNumber } = require("../utils")

//? INFO: Thing - Taps the nearest shoulder of the player on their immediate right or left //THING, ANNOYING_LAD
exports.thing = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const neighbors = getPlayerNeighborsByToken(newGameState.players, token)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: neighbors,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  role_interactions.push({
    type: INTERACTION,
    title: "THING",
    token,
    message: "interaction_thing",
    selectable_cards: neighbors,
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.thing_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false ) return gameState
  
  const newGameState = {...gameState}
  const role_interactions = []

  const tapPlayer = getPlayerTokenByPlayerNumber(newGameState.players, selected_positions[0])
  //TODO tap player

  newGameState.players[token].role_history.tapped_player = selected_positions[0]

  role_interactions.push({
    type: INTERACTION,
    title: "THING",
    token,
    message: "interaction_thing2",
    tapped_player: selected_positions[0],
    shielded_players: newGameState.shield,
  })
  
  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} tapped their neighbor on the next position: ${selected_positions[0]}`

  return newGameState
}
