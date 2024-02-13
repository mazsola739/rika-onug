const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Oracle - App asks her a question, she enters it on the app, when then reveals what she did to everyone
//! At this moment doppelganger never see flipped or shielded cards
//* No doppelganger
exports.oracle = (gameState, token) => {
  const newGameState = { ...gameState }

  return newGameState
}

//TODO
exports.oracle_response = (gameState, token) => {
  
  const newGameState = { ...gameState }

  return newGameState
}
