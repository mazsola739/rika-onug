const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//TODO doppelganger
//? INFO: The Count - Gives a non-Vampire the Mark of Fear; this prevents that player from doing their night action
//! NO flipped card but shield
exports.thecount = (gameState, token) => {
  const newGameState = { ...gameState }

  return newGameState
}

exports.thecount_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  return newGameState
}
