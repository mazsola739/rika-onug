const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithMatchingTokens } = require("../utils")
const { centerCardPositions } = require("../constants")


//? INFO: Drunk – Swap your card with a card from center but does not look at his new card
exports.drunk = (gameState, token) => {
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
    title: "DRUNK",
    token,
    message: "interaction_drunk",
    selectable_cards: centerCardPositions,
    shielded_players: newGameState.shield,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  return newGameState
}

exports.drunk_response = (gameState, token, selected_positions) => {
  if (selected_positions.every(position => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = []

  const drunkPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

  const playerCard = { ...newGameState.card_positions[drunkPlayerNumbers] }
  const selectedCard = { ...newGameState.card_positions[selected_positions[0]] }

  newGameState.card_positions[drunkPlayerNumbers] = selectedCard
  newGameState.card_positions[selected_positions[0]] = playerCard

  newGameState.players[token].card.id = 0

  newGameState.players[token].role_history.swapped_cards = [selected_positions[0], `player_${newGameState.players[token].player_number}`]
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "DRUNK",
    token,
    message: "interaction_drunk2",
    swapped_cards: [`player_${newGameState.players[token].player_number}`, `${selected_positions[0]}`],
    shielded_players: newGameState.shield,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped their card with ${selected_positions[0]}`

  return newGameState
}