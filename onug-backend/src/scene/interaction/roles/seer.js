const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions, concatArraysWithUniqueElements, getKeys } = require('../utils')
const { centerCardPositions } = require('../constants')
const { updatePlayerCard } = require("../update-player-card")
const { generateRoleInteractions } = require("../generate-role-interactions")
const { isValidSelection } = require("../validate-response-data")

//? INFO: Seer (2) - Looks at one player's card (not her own) or two cards from the center
exports.seer = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  tokens.forEach((token) => {
    const { players } = newGameState
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
    const selectablePositions = concatArraysWithUniqueElements(centerCardPositions, selectablePlayersWithNoShield)

    updatePlayerCard(newGameState, token)

    role_interactions.push(
      generateRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_any_other', "conjunction_or", "interaction_seer_end"],
        'seer',
        { selectable_cards: selectablePositions, selectable_card_limit: { player: 1, center: 2 } },
        null,
        null,
        null,
        null
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePositions, selectable_card_limit: { player: 1, center: 2 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, role_interactions }
}

exports.seer_response = (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const { players } = newGameState
  const player = players[token]
  const playerCard = player?.card

  let showCards = []

  const playerCards = selected_positions.some((pos) => pos.includes('player'))
  const centerCards = selected_positions.some((pos) => pos.includes('center'))
  const playerHistory = player.player_history.selectable_cards

  if (playerCards && !centerCards && playerHistory.includes(selected_positions[0])) {
    showCards = getCardIdsByPositions(newGameState?.card_positions, [selected_positions[0]])
  } else if (centerCards && !playerCards && selected_positions.every((position) => playerHistory.includes(position))) {
    showCards = getCardIdsByPositions(newGameState?.card_positions, selected_positions)
  } else {
    return newGameState
  }

  if (showCards.some((card) => playerCard.player_original_id === card.id)) {
    playerCard.player_card_id = 0
  }

  player.player_history.show_cards = showCards
  player.card_or_mark_action = true

  const role_interactions = [
    generateRoleInteractions(
      newGameState,
      title,
      token,
      ['interaction_saw_card', selected_positions[0], showCards.length > 1 ? selected_positions[1]: ""],
      'seer',
      null,
      showCards,
      null,
      null,
      { viewed_cards: showCards }
    )
  ]

  return { ...newGameState, role_interactions }
}
