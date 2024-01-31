const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getTokensByCardIds, getPlayerNumbersWithMatchingTokens, getPlayerNumbersWithNonMatchingTokens } = require("../utils");

//TODO doppelganger instant action
//? INFO: Robber - Swaps his card for any other player’s card (not center) which he then looks at
exports.robber = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const robberTokens = getTokensByCardIds(newGameState.players, [8]);
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, robberTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
    card_or_mark_action: false,
  }

  robberTokens.forEach((token) => {
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_robber",
      selectable_cards: selectablePlayerNumbers,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.robber_response = (gameState, token, selected_positions, ws) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  
  const newGameState = {...gameState}

  const robberPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);

  [newGameState.card_positions[selected_positions[0]], newGameState.card_positions[`player_${robberPlayerNumber[0]}`]] = [newGameState.card_positions[`player_${robberPlayerNumber[0]}`], newGameState.card_positions[selected_positions[0]]]

  newGameState.card_positions[selected_positions[0]].id = newGameState.players[token].card.role_id
  newGameState.card_positions[selected_positions[0]].team = newGameState.players[token].card.team
  

  const showCard = getCardIdsByPlayerNumbers(newGameState.card_positions, robberPlayerNumber);

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    token,
    message: "interaction_robber2",
    show_cards: showCard,
  })
  
  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped their card with ${selected_positions[0]} and then viewed their new card`

  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY swapped and showed cards',
  }))

  return newGameState
};