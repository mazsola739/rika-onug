const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens } = require("../utils")

//? INFO: Doppelgänger - Looks at any other player's card and becomes that card. Does that action during but different time
//! At this moment doppelganger never see flipped or shielded cards, ripple different
exports.doppelganger = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    
    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayerNumbers,
    }
    player.role_history = roleHistory

    const playerCard = player?.card

    role_interactions.push({
      type: INTERACTION,
      title,
      token,
      message: ["copy", "interaction_must_one_any_other"],
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.doppelganger_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const player = newGameState.players[token]
  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]
  const playerCard = player?.card

  playerCard.player_role_id = selectedPositionCard.id
  playerCard.player_role = selectedPositionCard.role
  playerCard.player_team = selectedPositionCard.team
  
  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
  const playerRoleHistory = player?.role_history

  playerRoleHistory.show_cards = showCards
  playerRoleHistory.card_or_mark_action = true
  playerRoleHistory.new_role_id = playerCard.player_role_id

  role_interactions.push({
    type: INTERACTION,
    title,
    token,
    message: ["copy", "interaction_you_are_that_role", `${playerCard.player_role}`],
    show_cards: showCards,
    new_role_id: playerCard.player_role_id,
    player_name: player.name,
    player_number: player.player_number,
    ...playerCard,
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
