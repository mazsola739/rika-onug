const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens , getKeys } = require("../utils")

//TODO doppelganger
//? INFO: Apprentice Assassin - Wakes up to see who the Assassin is he can only win if the Assassin  dies. If there is no Assassin, he becomes the Assassin
//! NO flipped card but shield
exports.apprenticeassassin = (gameState, tokens, title) => {}
exports.apprenticeassassin_response = (gameState, token, selected_positions, title) => {}
