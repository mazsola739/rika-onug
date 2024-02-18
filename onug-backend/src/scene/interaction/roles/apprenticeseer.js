const { INTERACTION } = require("../../../constant/ws")
const { getCardIdsByPositions, concatArraysWithUniqueElements , getKeys } = require("../utils")
const { centerCardPositions } = require("../constants")
const { updatePlayerCard } = require("../update-player-card")

//? INFO: Apprentice Seer - looks at one card from the center (not another players or her own)
exports.apprenticeseer = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players

  tokens.forEach((token) => {
    const player = players[token]

    const roleHistory = {
      ...newGameState.actual_scene,
      selectable_cards: centerCardPositions,
    }
    player.role_history = roleHistory

    updatePlayerCard(newGameState, token)
    const playerCard = player?.card
    const flippedCards = newGameState.flipped
  
    role_interactions.push({
      type: INTERACTION,
      title,
      token,
      message: ["spy", "interaction_may_one_center"],
      selectable_cards: centerCardPositions,
      selectable_card_limit: { player: 0, center: 1 },
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

exports.apprenticeseer_response = (gameState, token, selected_positions, title) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []
  const players = newGameState.players
  const player = players[token]
  const playerCard = player?.card
  const cardPositions =  newGameState.card_positions
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
    message: ["spy", "interaction_saw_card", `${selected_positions[0]}`],
    show_cards: concatArraysWithUniqueElements(showCards, newGameState.flipped),
    viewed_cards: [selected_positions[0]],
    shielded_cards: newGameState.shield,
    artifacted_cards: getKeys(newGameState.artifact),
    player_name: player?.name,
    player_number: player?.player_number,
    ...playerCard,
  })
  newGameState.role_interactions = role_interactions

  return newGameState
}
