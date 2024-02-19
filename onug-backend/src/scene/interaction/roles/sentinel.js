const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getPlayerTokenByPlayerNumber } = require("../utils")

//? INFO: Sentinel - Place a Shield token on any other player's card that card (not mark) cannot be looked at or moved
//! MARK_OF_FEAR
exports.sentinel = (gameState, tokens, title) => {
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
        'shield',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null
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

exports.sentinel_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const { players } = newGameState
  const shieldedPlayerToken = getPlayerTokenByPlayerNumber(players, selected_positions[0])

  newGameState.shield.push(selected_positions[0])
  players[shieldedPlayerToken].shield = true

  const player = players[token]
  player.player_history.new_shield_card = selected_positions[0]

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_placed_shield", selected_positions[0]],
      'shield',
      null,
      null,
      null,
      null,
      { new_shield_card: [selected_positions[0]] }
    )
  ]

  return { ...newGameState, role_interactions }
}
