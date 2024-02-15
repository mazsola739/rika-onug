const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, flippedCardIds, isPlayersCardsFlipped, isActivePlayersCardsFlipped } = require("../utils")
const { townIds } = require("../constants")

//? INFO: Revealer - Turns and keeps one player's card face up unless they are not on the Villager Team
//TODO doppelganger
exports.revealer = (gameState, tokens) => {
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
      
      selectable_card_limit: { player: 1, center: 0 },
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

  const selectablePlayersWithNoShield = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayersWithNoShield,
  }

  newGameState.players[token].role_history = roleHistory
  
  const revealerPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, revealerPlayerNumber)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, revealerPlayerNumber)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[revealerPlayerNumber[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[revealerPlayerNumber[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[revealerPlayerNumber[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[revealerPlayerNumber[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "REVEALER",
    token,
    message: "interaction_revealer",
    selectable_cards: selectablePlayersWithNoShield,
    shielded_cards: newGameState.shield,
    show_cards: newGameState.flipped,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.revealer_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const flippedCard = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
  const isTown = townIds.includes(flippedCard)

  newGameState.players[token].role_history.card_or_mark_action = true

  const revealerPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const revealerCardInFlippedCards = isActivePlayersCardsFlipped(flippedCard, revealerPlayerNumber)

  if (revealerCardInFlippedCards) {
    newGameState.players[token].card.id = 0
  }

  role_interactions.push({
    type: INTERACTION,
    title: "REVEALER",
    token,
    message: "interaction_revealer2",
    shielded_cards: newGameState.shield,
    show_cards: flippedCard,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.actual_scene.interaction = `The player, ${newGameState.players[token].player_number}, flipped a card in the next position: ${selected_positions[0]}, and it turned out to be ${isTown ? "a town member" : "a non-town member"}.`

  if (isTown) {
    newGameState.flipped.push(flippedCard)
    newGameState.players[token].role_history.flipped_cards = [flippedCard]
  } else {
    newGameState.players[token].role_history.show_cards = [flippedCard]
  }

  newGameState.role_interactions = role_interactions

  return newGameState
}