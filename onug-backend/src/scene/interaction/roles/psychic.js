const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Psychic - Looks at 1-2 cards, which in position via app such as neighbors, center, odd or even players
//TODO doppelganger
//! NO flipped card but shield
exports.psychic = (gameState, token) => {
  const newGameState = { ...gameState }

  return newGameState
}
