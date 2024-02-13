
//? INFO: Instigator - Give any player (including herself) a Mark of the Traitor they only win if someone on their team dies
//! NO flipped card but shield
exports.instigator = () => (gameState) => {
  const newGameState = { ...gameState }


  return newGameState
}

exports.instigator_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  return newGameState
}
