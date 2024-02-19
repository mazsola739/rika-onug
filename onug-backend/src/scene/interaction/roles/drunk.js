const { getPlayerNumbersWithMatchingTokens } = require("../utils")
const { centerCardPositions } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")

//? INFO: Drunk – Swap your card with a card from center but does not look at his new card
exports.drunk = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    updatePlayerCard(newGameState, token)
    const playerCard = newGameState.players[token]?.card

    if (!playerCard.shield) {
      role_interactions.push(
        generateRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_must_one_center'],
          'drunk',
          { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 } },
          null,
          null,
          null,
          null
        )
      )

      const playerHistory = {
        ...newGameState.players[token].player_history,
        ...newGameState.actual_scene,
        selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 }
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
      player.player_history = playerHistory
    }
  })

  return { ...newGameState, role_interactions }
}

exports.drunk_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

   const { players } = newGameState
  const player = players[token]
  const cardPositions = newGameState.card_positions
  const selectedPositionCard = cardPositions[selected_positions[0]]

  const drunkPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])[0]

  const drunkCard = { ...cardPositions[drunkPlayerNumber] }
  const selectedCard = { ...selectedPositionCard }
  cardPositions[drunkPlayerNumber] = selectedCard
  cardPositions[selected_positions[0]] = drunkCard

  player.card.player_card_id = 0
  player.player_history.swapped_cards = [selected_positions[0], `player_${player.player_number}`]
  player.card_or_mark_action = true

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_swapped_cards", selected_positions[0], `player_${player.player_number}`],
      'shield',
      null,
      null,
      null,
      null,
      { swapped_cards: [`player_${player.player_number}`, selected_positions[0]] }
    )
  ]

  return { ...gameState, role_interactions }
}
