const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const {
  findPlayersByCardIds,
  getCardIdsByPositions,
} = require("../utils");
const { centerCardPositions } = require("../constants");

exports.drunk = (gameState) => {
/*   const newGameState = {...gameState} */
  const role_interactions = [];
  const drunkTokens = findPlayersByCardIds(gameState.players, [2]);

  drunkTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "DRUNK",
      selectable_cards: centerCardPositions,
    })
  );

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return role_interactions;
};

exports.drunk_response = (gameState, selected_positions, ws) => {
  const role_interactions = [];
  const drunkTokens = findPlayersByCardIds(gameState.players, [2]);
  const flippableCards = getCardIdsByPositions(
    gameState.card_positions,
    selected_positions
  );
  
  drunkTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "DRUNK",
      flippable_cards: flippableCards,
    })
  );

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  const newGameState = {...gameState}
  newGameState.action_history.push({
    scene_title: "DRUNK",
    scene_number: 69,
  });

  newGameState.role_interactions = role_interactions
  
  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY showed card',
  }))

  return newGameState
};