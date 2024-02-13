const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Vampire (2) - Open their eyes and view their fellow Vampires (including The Count and The Master). Then decide together to give one non-Vampire the Mark of the Vampire, which turns them into a Vampire
//! NO flipped card but shield
exports.vampires = (gameState, tokens) => {
  const newGameState = { ...gameState }

  return newGameState
}

exports.vampires_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  return newGameState
}
