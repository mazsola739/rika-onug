const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions } = require("../utils")

//? INFO: Doppelgänger - Looks at any other player's card and becomes that card. Does that action during but different time
//! At this moment doppelganger never see flipped or shielded cards
exports.doppelganger = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  role_interactions.push({
    type: INTERACTION,
    title: "DOPPELGÄNGER",
    token,
    message: "interaction_doppelganger",
    selectable_cards: selectablePlayerNumbers,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })
  
  newGameState.role_interactions = [...role_interactions]

  return newGameState
}

exports.doppelganger_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]

  newGameState.players[token].card.role_id = selectedPositionCard.id
  newGameState.players[token].card.role = selectedPositionCard.role
  newGameState.players[token].card.team = selectedPositionCard.team
  
  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true
  newGameState.players[token].role_history.new_role_id = newGameState.players[token].card.role_id

  role_interactions.push({
    type: INTERACTION,
    title: "DOPPELGÄNGER",
    token,
    message: "interaction_doppelganger2",
    show_cards: showCards,
    new_role_id: newGameState.players[token].card.role_id,
    player_name: newGameState.players[token]?.name,
    player_original_id: newGameState.players[token]?.card?.original_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = [...role_interactions]

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} copied the card from the next position: ${selected_positions[0]}`

  return newGameState
}
