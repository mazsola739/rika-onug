const { INTERACTION } = require('../../../constant/ws')
const { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getCardIdsByPositions, concatArraysWithUniqueElements, getKeys } = require('../utils')
const { centerCardPositions } = require('../constants')
const { updatePlayerCard } = require('../update-player-card')

//? INFO: Seer (2) - Looks at one player's card (not her own) or two cards from the center
exports.seer = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)
    const selectablePositions = concatArraysWithUniqueElements(centerCardPositions, selectablePlayersWithNoShield)

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePositions,
    }

    player.role_history = roleHistory

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    role_interactions.push({
      type: INTERACTION,
      title,
      token,
      message: ['interaction_may_one_any_other', "conjunction_or", "interaction_seer_end"],
      selectable_cards: selectablePositions,
      selectable_card_limit: { player: 1, center: 2 },
      shielded_cards: newGameState.shield,
      artifacted_cards: getKeys(newGameState.artifact),
      show_cards: flippedCards,
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
    })
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.seer_response = (gameState, token, selected_positions, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  let showCards = []

  const playerCards = selected_positions.some((pos) => pos.includes('player'))
  const centerCards = selected_positions.some((pos) => pos.includes('center'))

  const player = players[token]
  const roleHistory = player.role_history.selectable_cards

  if (playerCards && !centerCards && roleHistory.includes(selected_positions[0])) {
    showCards = getCardIdsByPositions(gameState?.card_positions, [selected_positions[0]])
  } else if (centerCards && !playerCards && selected_positions.every((position) => roleHistory.includes(position))) {
    showCards = getCardIdsByPositions(gameState?.card_positions, selected_positions)
  } else {
    return newGameState
  }

  const playerCard = player?.card

  if (showCards.some((card) => playerCard.player_original_id === card.id)) {
    playerCard.player_card_id = 0
  }

  player.role_history.show_cards = showCards
  player.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title,
    token,
    message: ['interaction_saw_card', `${selected_positions[0]}`, showCards.length > 1 ? `${selected_positions[1]}`: ""],
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    player_name: player?.name,
    player_number: player?.player_number,
    ...playerCard,
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
