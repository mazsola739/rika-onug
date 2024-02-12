const { INTERACTION } = require("../../../constant/ws")
const { getCardIdsByPositions, getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield } = require("../utils")

//? INFO: Mystic Wolf - Wakes with other Werewolves. Wakes after and looks at any other player's card (not center or own)
exports.mysticwolf = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token)
  const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayersWithNoShield,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  role_interactions.push({
    type: INTERACTION,
    title: "MYSTIC_WOLF",
    token,
    message: "interaction_mysticwolf",
    selectable_cards: selectablePlayersWithNoShield,
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.mysticwolf_response = (gameState, token, selected_positions) => {
  const { role_history } = gameState.players[token]
  
  if (!selected_positions.every(position => role_history.selectable_cards.includes(position))) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "MYSTIC_WOLF",
    token,
    message: "interaction_mysticwolf2",
    show_cards: showCards,
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions
  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed the card at position: ${selected_positions[0]}`

  return newGameState
}
