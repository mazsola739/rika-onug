const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getTokensByCardIds, getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions } = require("../utils");

//? INFO: Doppelgänger - Looks at any other player's card and becomes that card. Does that action during but different time
exports.doppelganger = (gameState) => {
  const newGameState = { ...gameState };
  const role_interactions = [];

  const doppelgangerTokens = getTokensByCardIds(newGameState.players, [1]);
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, doppelgangerTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
    card_or_mark_action: false,
  }

  doppelgangerTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_doppelganger",
      selectable_cards: selectablePlayerNumbers,
      shielded_players: newGameState.shield,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.doppelganger_response = (gameState, token, selected_positions, ws) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  
  const newGameState = {...gameState}
  const role_interactions = [];

  newGameState.card_positions[selected_positions[0]].id = newGameState.players[token].card.role_id
  newGameState.card_positions[selected_positions[0]].team = newGameState.players[token].card.team
  
  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]]);

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true
  newGameState.players[token].role_history.new_role_id = newGameState.players[token].card.role_id

  role_interactions.push({
    type: INTERACTION,
    token,
    message: "interaction_doppelganger2",
    show_cards: showCards,
    new_role_id: newGameState.players[token].card.role_id
  })

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} copied card on the next position: ${selected_positions[0]}`

  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY copied cards',
  }))

  return newGameState
};
