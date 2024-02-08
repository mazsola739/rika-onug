const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getTokensByRoleIds, getPlayerNumbersWithMatchingTokens, getDreamWolfPlayerNumberByRoleIds, getCardIdsByPositions } = require("../utils");
const { werewolvesIds, centerCardPositions } = require("../constants");

//TODO DREAMWOLF & werewolf_response
//? INFO: Werewolves (4) - Open their eyes and view their fellow Werewolves (including Mystic and Alpha)
exports.werewolves = gameState => {
  const newGameState = { ...gameState };
  const role_interactions = [];

  const werewolfTokens = getTokensByRoleIds(newGameState.players, werewolvesIds);
  const werewolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, werewolfTokens);
  const dreamWolfPlayerNumber = getDreamWolfPlayerNumberByRoleIds(newGameState.players)

  const loneWolf = werewolfPlayerNumbers.length + dreamWolfPlayerNumber.length === 1

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: loneWolf ? centerCardPositions : [],
    card_or_mark_action: false,
  }

  werewolfTokens.forEach((token) => {
    newGameState.players[token].role_history = roleHistory;

    role_interactions.push({
      type: INTERACTION,
      title: "WEREWOLVES",
      token,
      message: "interaction_werewolves",
      werewolves: werewolfPlayerNumbers,
      selectable_cards: loneWolf ? centerCardPositions : [],
      shielded_players: newGameState.shield,
    });

    if (!loneWolf) newGameState.actual_scene.interaction = `The Werewolves saw werewolf position(s): player ${werewolfPlayerNumbers.join(', ')} and dream wolf position(s): player ${dreamWolfPlayerNumber.join(', ')}`
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return newGameState;
};

exports.werewolves_response = (gameState, token, selected_positions, ws) => {
  if (selected_positions.every(position => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  
  const newGameState = {...gameState}

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]]);

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "WEREWOLVES",
    token,
    message: "interaction_werewolves2",
    show_cards: showCards,
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed card on the next position: ${selected_positions[0]}`

  ws.send(JSON.stringify({
    type: INTERACTION,
    title: "WEREWOLVES",
    message: 'SUCCESSFULLY showed cards',
  }))

  return newGameState
};