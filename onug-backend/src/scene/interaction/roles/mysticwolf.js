const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")
const { getCardIdsByPositions, getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield } = require("../utils")

//? INFO: Mystic Wolf - Wakes with other Werewolves. Wakes after and looks at any other player's card (not center or own)
exports.mysticwolf = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const { players } = newGameState
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_any_other'],
        'spy',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null,
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}

exports.mysticwolf_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const player = newGameState.players[token]
  const playerCard = player?.card
  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]
  const viewCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])

  if (playerCard?.original_id === selectedPositionCard.id) {
    playerCard.player_card_id = 0
  }

  player.player_history.show_cards = viewCards
  player.card_or_mark_action = true

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_saw_card", selected_positions[0]],
      'spy',
      null,
      viewCards,
      null,
      null,
      { viewed_cards: [selected_positions[0]] }
    )
  ]

  return { ...newGameState, role_interactions }
}
