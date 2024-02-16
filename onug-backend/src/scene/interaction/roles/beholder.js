const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped , getKeys } = require("../utils")

//? INFO: Beholder - Seer and Apprentice Seer stick up their thumbs for her to see, who may check their cards
exports.beholder = (gameState, tokens) => {
  const newGameState = { ...gameState }

  tokens.forEach((token) => {
    const roleHistory = {
      ...newGameState.actual_scene,
    }
  
    newGameState.players[token].role_history = roleHistory
      
  
  
    role_interactions.push({
      type: INTERACTION,
      title: "",
      token,
      message: "interaction_",
      
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      player_name: newGameState.players[token]?.name,
      player_original_id: newGameState.players[token]?.card?.original_id,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })
  
   // newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw Mason position(s): player ${masonPlayerNumbers.join(', ')}`
  })
  
    newGameState.role_interactions = role_interactions

  const beholderPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, beholderPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, beholderPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[beholderPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[beholderPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[beholderPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[beholderPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  return newGameState
}

