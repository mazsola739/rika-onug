const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//TODO doppelganger
//! NO flipped card but shield
exports.assassin = (gameState, token) => {
  const newGameState = { ...gameState }

  return newGameState
}
