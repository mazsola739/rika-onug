const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokensByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped , getKeys } = require("../utils")

//? INFO: Aliens - View their fellow Aliens (including Body Snatcher, Synthetic, Groob and Zerb) and do the action app says
//! MARK_OF_FEAR
exports.aliens = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const alienPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, tokens)

  tokens.forEach((token) => {
    const roleHistory = {
      ...newGameState.actual_scene,
    }

    newGameState.players[token].role_history = roleHistory

    const alienPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, alienPlayerNumber)
    const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, alienPlayerNumber)
  
    if (iSeeMyCardIsFlipped) {
      newGameState.players[token].card.id = newGameState.card_positions[alienPlayerNumber[0]].id
      newGameState.players[token].card.role_id = newGameState.card_positions[alienPlayerNumber[0]].id
      newGameState.players[token].card.role = newGameState.card_positions[alienPlayerNumber[0]].role
      newGameState.players[token].card.team = newGameState.card_positions[alienPlayerNumber[0]].team
    } else if (iSeeMyCardElsewhere) {
      newGameState.players[token].card.id = 0
    }

    role_interactions.push({
      type: INTERACTION,
      title: "ALIENS",
      token,
      message: "interaction_aliens",
      
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

  return newGameState
}
