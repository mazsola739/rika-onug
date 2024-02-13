const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Aura Seer - All players that have viewed or moved a card or mark stick up their thumbs for her to see (list of roles in FAQ)
exports.auraseer = (gameState, token) => {
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



/*AURA SEER moved viewed Copycat, Doppelgänger, Rascal, Body Snatcher, Alpha Wolf, Mystic Wolf, Seer, Exposer, 
Mortician, Psychic, Apprentice Seer, Paranormal Investigator, Marksman, Robber, Witch, 
Troublemaker, Village Idiot,  Cupid, Any Vampire, Count,  Pickpocket, Priest, Diseased,  
Insomniac, Instigator, Assassin, Apprentice Assassin(If there is no Assassin) */