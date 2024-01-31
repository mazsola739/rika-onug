const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { findPlayersByCardIds } = require("../utils");
const { centerCardPositions } = require("../constants");

//TODO doppelganger instant action
//? INFO: Drunk – Swap your card with a card from center but does not look at his new card
exports.drunk = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const drunkTokens = findPlayersByCardIds(newGameState.players, [2]);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: centerCardPositions,
    card_or_mark_action: true,
  }

  drunkTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_drunk",
      selectable_cards: centerCardPositions,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.drunk_response = (gameState, token, selected_positions, ws) => {
  //TODO kezelni ha nem egyezik
  if (selected_positions.every(position => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return
  
  const newGameState = {...gameState}

  [newGameState.players[token].card.role_id, newGameState.card_positions[selected_positions[0]].id] = [newGameState.card_positions[selected_positions[0]].id, newGameState.players[token].card.role_id]
  [newGameState.players[token].card.team, newGameState.card_positions[selected_positions[0]].team] = [newGameState.card_positions[selected_positions[0]].team, newGameState.players[token].card.team]
  
  //TODO action_history
  newGameState.action_history.push({
    scene_title: "DRUNK",
    scene_number: 69,
  });

  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY swapped cards',
  }))

  return newGameState
};