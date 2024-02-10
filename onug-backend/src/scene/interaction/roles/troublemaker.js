const { INTERACTION } = require("../../../constant/ws")
const { getPlayerNumbersWithNonMatchingTokens } = require("../utils");


//? INFO: Troublemaker - Swaps any two other player's cards (not her own or center) without looking at them
exports.troublemaker = (gameState, token) => {
  const newGameState = { ...gameState }
  const role_interactions = [];

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
    card_or_mark_action: false,
  }

  newGameState.players[token].role_history = roleHistory

  role_interactions.push({
    type: INTERACTION,
    title: "TROUBLEMAKER",
    token,
    message: "interaction_troublemaker",
    selectable_cards: selectablePlayerNumbers,
    shielded_players: newGameState.shield,
  })


  newGameState.role_interactions = role_interactions

  return newGameState;
};

exports.troublemaker_response = (gameState, token, selected_positions) => {
  if (selected_positions.every(position => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState

  const newGameState = { ...gameState }
  const role_interactions = [];

  const playerOneCard = { ...newGameState.card_positions[selected_positions[0]] };
  const playerTwoCard = { ...newGameState.card_positions[selected_positions[1]] };

  newGameState.card_positions[selected_positions[0]] = playerTwoCard;
  newGameState.card_positions[selected_positions[1]] = playerOneCard;

  newGameState.players[token].role_history.swapped_cards = selected_positions.slice(0, 2)
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "TROUBLEMAKER",
    token,
    message: "interaction_troublemaker2",
    swapped_cards: selected_positions.slice(0, 2),
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped cards between: ${selected_positions[0]} and ${selected_positions[1]}`

  return newGameState
};