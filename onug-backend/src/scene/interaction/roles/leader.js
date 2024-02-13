
//? INFO: Leader - Aliens must stick out thumb for him to see. if all Aliens vote the Leader, they win, even if an Alien is killed. If Groob and Zerb are in play, he is on his own team wins if they survive
//TODO doppelganger
exports.leader = () => gameState => {
  const newGameState = { ...gameState }

  const alphawolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumbers)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumbers)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[alphawolfPlayerNumbers[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[alphawolfPlayerNumbers[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[alphawolfPlayerNumbers[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[alphawolfPlayerNumbers[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  return newGameState
}
