const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//TODO doppelganger
//? INFO: Renfield - With their eyes closed, sees who Vampires gave Mark of the Vampire then gives himself Mark of the Bat
//! NO flipped card but shield
exports.renfield = (gameState, token) => {
  const newGameState = { ...gameState }

  return newGameState
}
