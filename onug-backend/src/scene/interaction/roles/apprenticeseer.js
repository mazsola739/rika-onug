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

  const alphawolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])
  const iSeeMyCardIsFlipped = isActivePlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumbers)
  const iSeeMyCardElsewhere = isPlayersCardsFlipped(newGameState.flipped, alphawolfPlayerNumbers)

  if (iSeeMyCardIsFlipped) {
    newGameState.players[token].card.id = newGameState.card_positions[alphawolfPlayerNumbers[0]].id
    newGameState.players[token].card.role_id = newGameState.card_positions[alphawolfPlayerNumbers[0]].id
    newGameState.players[token].card.role = newGameState.card_positions[alphawolfPlayerNumbers[0]].role
    newGameState.players[token].card.team = newGameState.card_positions[alphawolfPlayerNumbers[0]].team
  } else if (iSeeMyCardElsewhere) {
    newGameState.players[token].card.id = 0
  }

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
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

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
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed a card in the next position: ${selected_positions[0]}`

  return newGameState
}
