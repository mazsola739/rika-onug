const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getTokensByCardIds, getCardIdsByPositions, getPlayerNumbersWithNonMatchingTokens } = require("../utils");

//TODO doppelganger instant action
//? INFO: Mystic Wolf - Wakes with other Werewolves. Wakes after and looks at any other player's card (not center or own)
exports.mysticwolf = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const mysticwolfTokens = getTokensByCardIds(newGameState.players, [22]);
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, mysticwolfTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
    card_or_mark_action: false,
  }

  mysticwolfTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_mysticwolf",
      selectable_cards: selectablePlayerNumbers,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.mysticwolf_response = (gameState, token, selected_positions, ws) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  
  const newGameState = {...gameState}
  const role_interactions = [];

  showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]]);

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    token,
    message: "interaction_mysticwolf2",
    show_cards: showCards,
  })

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed card on the next position: ${selected_positions[0]}`

  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY showed cards',
  }))

  return newGameState
};