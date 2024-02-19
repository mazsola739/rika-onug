const { centerCardPositions } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")
const { getPlayerNumbersWithMatchingTokens, getSelectablePlayersWithNoShield, getAllPlayerTokens, getCardIdsByPositions } = require("../utils")

//? INFO: Witch - May look at one center card. If she does she must swap it with any player's card (including hers)
exports.witch = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach(token => {
    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_center'],
        'voodoo',
        { selectable_cards: centerCardPositions, selectable_card_limit: { player: 1, center: 0 } },
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
  })

  return { ...newGameState, role_interactions }
}

exports.witch_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const { players, card_positions: cardPositions } = newGameState
  const player = players[token]
  const playerCard = player?.card

  if (selected_positions[0].includes("center_")) {
    const showCards = getCardIdsByPositions(cardPositions, [selected_positions[0]])
    const selectedCenterCardPosition = cardPositions[selected_positions[0]]

    if (playerCard.original_id === selectedCenterCardPosition.id) {
      playerCard.player_card_id = 0
    }

    const allPlayerTokens = getAllPlayerTokens(players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const role_interactions = [
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_saw_card", selected_positions[0], "interaction_must_one_any"],
        'voodoo',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        showCards,
        null,
        { viewed_cards: [selected_positions[0]] }
      )
    ]

    player.player_history.selectable_cards = selectablePlayersWithNoShield
    player.player_history.selectable_card_limit = { player: 1, center: 0 }
    player.player_history.selected_center_card = selected_positions[0]
    player.player_history.show_cards = showCards

    return { ...newGameState, role_interactions }
  } else if (selected_positions[0].includes("player_")) {
    const selectedCenterPositionCard = cardPositions[player.player_history.selected_center_card]
    const selectedPlayerPositionCard = cardPositions[selected_positions[0]]

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    cardPositions[player.player_history.selected_center_card] = selectedPlayerCard
    cardPositions[selected_positions[0]] = selectedCenterCard

    const witchPlayerNumber = getPlayerNumbersWithMatchingTokens(players, [token])

    if (selected_positions[0] === witchPlayerNumber[0]) {
      const currentCard = newGameState.card_positions[witchPlayerNumber[0]]
      playerCard.player_card_id = currentCard.id
      playerCard.player_team = currentCard.team
    }

    const role_interactions = [
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_saw_card", "interaction_swapped_cards", `${player.player_history.selected_center_card}`, selected_positions[0]],
        'voodoo',
        null,
        null,
        null,
        null,
        { swapped_cards: [player.player_history.selected_center_card, selected_positions[0]] }
      )
    ]

    player.player_history.swapped_cards = [player.player_history.selected_center_card, selected_positions[0]]

    return { ...newGameState, role_interactions }
  }

  return newGameState
}
