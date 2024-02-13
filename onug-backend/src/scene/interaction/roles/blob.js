const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//TODO doppelganger same result as blob
//! NEM KEL FEL, BLOB-NAK AZ ICON-T
//? INFO: Blob -  Wins if no player part of him (left, right or both), via app, dies
exports.blob = (gameState, token) => {
  const newGameState = { ...gameState }

  return newGameState
}
