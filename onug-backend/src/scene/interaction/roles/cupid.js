const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: Cupid - Gives any two players (including herself) a Mark of Love if one of them dies so does the other
//! NO flipped card but shield
exports.cupid = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []

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
  
  const cupidPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, cupidPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, cupidPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[cupidPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[cupidPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[cupidPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[cupidPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  return newGameState
}

exports.cupid_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  return newGameState
}