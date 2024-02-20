const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getPlayerNumbersWithMatchingTokens, getCardIdsByPlayerNumbers } = require("../utils")

//? INFO: Robber - Swaps his card for any other player’s card (not center) which he then looks at
exports.robber = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    updatePlayerCard(newGameState, token)
    const playerCard = newGameState.players[token]?.card

    if (!playerCard.shield) {
      const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token)
      const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

      role_interactions.push(
        generateRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_may_one_any_other'],
          'robber',
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

    } else {
      role_interactions.push(
        generateRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_shielded'],
          'shield',
          null,
          null,
          null,
          null,
          null
        )
      )

      const playerHistory = {
        ...newGameState.players[token].player_history,
        ...newGameState.actual_scene,
        shielded: true
      }
      newGameState.players[token].player_history = playerHistory
    }
  })

  return { ...newGameState, role_interactions }
}

exports.robber_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  const { players, card_positions } = newGameState
  const player = players[token]
  const playerCard = player.card

  const robberPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])[0]

  const robberCard = { ...card_positions[robberPlayerNumber] }
  const selectedCard = { ...card_positions[selected_positions[0]] }
  card_positions[robberPlayerNumber] = selectedCard
  card_positions[selected_positions[0]] = robberCard

  playerCard.player_card_id = card_positions[robberPlayerNumber].id
  playerCard.player_team = card_positions[robberPlayerNumber].team

  const showCards = getCardIdsByPlayerNumbers(card_positions, [robberPlayerNumber])

  player.player_history.swapped_cards = [selected_positions[0], `player_${player.player_number}`]
  player.player_history.show_cards = showCards
  player.card_or_mark_action = true

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_swapped_cards", "interaction_saw_card", `player_${player.player_number}`],
      'robber',
      null,
      null,
      showCards,
      null,
      { swapped_cards: [`player_${player.player_number}`, selected_positions[0]], viewed_cards: [`player_${player.player_number}`] }
    )
  ]

  return { ...gameState, role_interactions }
}
