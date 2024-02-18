const { INTERACTION } = require("../../../constant/ws")
const { updatePlayerCard } = require("../update-player-card")
const { getCardIdsByPositions, getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield, getKeys } = require("../utils")

//? INFO: Mystic Wolf - Wakes with other Werewolves. Wakes after and looks at any other player's card (not center or own)
exports.mysticwolf = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield,
    }

    player.role_history = roleHistory

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped

    role_interactions.push({
      type: INTERACTION,
      title,
      token,
      message: ["interaction_may_one_any_other"],
      selectable_cards: selectablePlayersWithNoShield,
      selectable_card_limit: { player: 1, center: 0 },
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

exports.mysticwolf_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState?.card_positions
  const showCards = getCardIdsByPositions(cardPositions, [selected_positions[0]])
  const selectedPositionCard = cardPositions[selected_positions[0]]

  if (playerCard.original_id === selectedPositionCard.id) {
    playerCard.player_card_id = 0
  }

  player.role_history.show_cards = showCards
  player.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title,
    token,
    message: ["interaction_saw_card", `${selected_positions[0]}`],
    show_cards: showCards,
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
      player_name: player?.name,
      player_number: player?.player_number,
      ...playerCard,
  })
  newGameState.role_interactions = role_interactions
 
  return newGameState
}
