const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions } = require("../utils")

//? INFO: Doppelgänger - Looks at any other player's card and becomes that card. Does that action during but different time
//! At this moment doppelganger never see flipped or shielded cards, ripple different
exports.doppelganger = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const { players, actual_scene } = newGameState
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_must_one_any_other'],
        'copy',
        { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null,
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}

exports.doppelganger_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const { players, card_positions } = newGameState
  const selectedPositionCard = card_positions[selected_positions[0]]
  const playerCard = players[token]?.card

  playerCard.player_role_id = selectedPositionCard.id
  playerCard.player_role = selectedPositionCard.role
  playerCard.player_team = selectedPositionCard.team
  
  const showCards = getCardIdsByPositions(card_positions, [selected_positions[0]])

  players[token].player_history.show_cards = showCards,
  players[token].player_history.new_role_id = playerCard.player_role_id
  players[token].card_or_mark_action = true

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_placed_artifact", `${playerCard.player_role}`],
      'copy',
      null,
      null,
      showCards,
      null,
      { new_role_id: playerCard.player_role_id, }
    )
  ]

  return { ...newGameState, role_interactions }
}
