const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const {
  findPlayersByRoleIds,
  getPlayerNumbersWithMatchingTokens,
  getRolePositions,
  getCardIdsByPositions,
} = require("../utils");
const { werewolvesIds, centerCardPositions } = require("../constants");
//TODO DREAMWOLF & werewolf_response
exports.werewolves = gameState => {
  const role_interactions = [];
  const werewolfTokens = findPlayersByRoleIds(gameState.players, werewolvesIds);
  const werewolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(
    gameState.players,
    werewolfTokens
  );
  const flippableCards = getRolePositions(werewolfPlayerNumbers, 15)
  const selectableCards = flippableCards.length === 1 ? centerCardPositions : [];

  werewolfTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "WEREWOLVES",
      flippable_cards: flippableCards,
      selectable_cards: selectableCards,
    })
  );

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return role_interactions;
};

exports.werewolves_response = (gameState, selected_positions, ws) => {
  //TODO centerCardPositions === selected_positions ?

  const role_interactions = [];
  const werewolfTokens = findPlayersByRoleIds(gameState.players, werewolvesIds);
  const flippableCards = getCardIdsByPositions(
    gameState.card_positions,
    selected_positions
  );
  
  werewolfTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "WEREWOLVES",
      flippable_cards: flippableCards,
    })
  );

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  const newGameState = {...gameState}
  newGameState.action_history.push({
    scene_title: "WEREWOLVES",
    scene_number: 36,
  });

  newGameState.role_interactions = role_interactions
  
  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY showed card',
  }))

  newGameState.role_interactions = role_interactions

  return newGameState
};