const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Squire - All Werewolf team (not Minion/Squire) stick up their thumb for him to see, who may look at their cards
exports.squire = (gameState, token) => {
  const newGameState = { ...gameState }

  const alphawolfPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[alphawolfPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[alphawolfPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[alphawolfPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[alphawolfPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  return newGameState
}
