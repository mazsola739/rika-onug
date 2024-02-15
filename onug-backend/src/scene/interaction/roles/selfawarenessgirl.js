const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, isActivePlayersCardsFlipped, isPlayersCardsFlipped } = require("../utils")

//? INFO: SELF_AWARENESS_GIRL – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.selfawarenessgirl = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []


  const selfawarenessgirlPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    /* const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, selfawarenessgirlPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, selfawarenessgirlPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[selfawarenessgirlPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[selfawarenessgirlPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[selfawarenessgirlPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[selfawarenessgirlPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  } */

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
      
      selectable_limit: { player: 0, center: 0 },
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

  if (!newGameState.players[token].card.shield) {
    const selfAwarenessGirlPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
    const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, selfAwarenessGirlPlayerNumber)

    const roleHistory = {
      ...newGameState.actual_scene,
      show_cards: showCards,
    }

    newGameState.players[token].role_history = roleHistory
    newGameState.players[token].card.team = newGameState.card_positions[`player_${selfAwarenessGirlPlayerNumbers[0]}`]?.team
    
    role_interactions.push({
      type: INTERACTION,
      title: "SELF_AWARENESS_GIRL",
      token,
      message: "interaction_insomniac",
      show_cards: showCards,
      shielded_cards: newGameState.shield,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed their card`
  } else {
    role_interactions.push({
      type: INTERACTION,
      title: "SELF_AWARENESS_GIRL",
      token,
      message: "interaction_shielded",
      shielded_cards: newGameState.shield,
    })

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} has shield, can't view their card`
  }

  newGameState.role_interactions = role_interactions

  return newGameState
}
