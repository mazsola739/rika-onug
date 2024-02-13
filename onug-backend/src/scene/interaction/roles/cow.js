const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Cow - Puts hand out in a fist when Aliens wake. If an Alien is sitting next to her, one must tap her fist
//! NEM KEL FEL
exports.cow = (gameState, token) => {
  const newGameState = { ...gameState }



  return newGameState
}
