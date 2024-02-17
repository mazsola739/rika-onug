const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens } = require("../utils")

//? INFO: Doppelgänger - Looks at any other player's card and becomes that card. Does that action during but different time
//! At this moment doppelganger never see flipped or shielded cards, ripple different
exports.doppelganger = (gameState, tokens) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const playerCard = player?.card

    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    
    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayerNumbers,
    }
    player.role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      title: "DOPPELGÄNGER",
      token,
      message: "interaction_doppelganger",
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
      player_name: player?.name,
      player_original_id: playerCard?.original_id,
      player_card_id: playerCard?.id,
      player_role: playerCard?.role,
      player_role_id: playerCard?.role_id,
      player_team: playerCard?.team,
      player_number: player?.player_number,
    })
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.doppelganger_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const player = newGameState.players[token]
  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]
  const playerCard = player?.card

  playerCard.role_id = selectedPositionCard.id
  playerCard.role = selectedPositionCard.role
  playerCard.team = selectedPositionCard.team
  
  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
  const playerRoleHistory = player?.role_history

  playerRoleHistory.show_cards = showCards
  playerRoleHistory.card_or_mark_action = true
  playerRoleHistory.new_role_id = playerCard.role_id

  role_interactions.push({
    type: INTERACTION,
    title: "DOPPELGÄNGER",
    token,
    message: "interaction_doppelganger2",
    show_cards: showCards,
    new_role_id: playerCard.role_id,
    player_name: player.name,
    player_original_id: playerCard.original_id,
    player_card_id: playerCard.id,
    player_role: playerCard.role,
    player_role_id: playerCard.role_id,
    player_team: playerCard.team,
    player_number: player.player_number,
  })

  newGameState.role_interactions = [...role_interactions]
  newGameState.actual_scene.interaction = `The player ${player.player_number} copied the card from the next position: ${selected_positions[0]}`

  return newGameState
}
