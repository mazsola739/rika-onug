const { INTERACTION } = require("../../../constant/ws")
const { getCardIdsByPositions } = require("../utils")
const { centerCardPositions } = require("../constants")

//? INFO: Apprentice Seer - looks at one card from the center (not another players or her own)
exports.apprenticeseer = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = []

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: centerCardPositions,
  }

  newGameState.players[token].role_history = roleHistory
  newGameState.players[token].card_or_mark_action = false

  role_interactions.push({
    type: INTERACTION,
    title: "APPRENTICE_SEER",
    token,
    message: "interaction_apprenticeseer",
    selectable_cards: centerCardPositions,
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.apprenticeseer_response = (gameState, token, selected_positions) => {
  const { players, shield } = gameState

  if (!players[token].role_history.selectable_cards.includes(selected_positions[0])) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "APPRENTICE_SEER",
    token,
    message: "interaction_apprenticeseer2",
    show_cards: showCards,
    shielded_players: shield,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${players[token].player_number} viewed a card in the next position: ${selected_positions[0]}`

  return newGameState
}
