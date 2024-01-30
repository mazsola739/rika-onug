const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { findPlayersByCardIds, getPlayerNumbersWithNonMatchingTokens } = require("../utils");

//TODO doppelganger instant action
//? INFO: Troublemaker - Swaps any two other player's cards (not her own or center) without looking at them
exports.troublemaker = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const troublemakerTokens = findPlayersByCardIds(newGameState.players, [11]);
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, troublemakerTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
    card_or_mark_action: false,
  }

  troublemakerTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_troublemaker",
      selectable_cards: selectablePlayerNumbers,
    })
  });

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.troublemaker_response = (gameState, token, selected_positions, ws) => {
  //TODO kezelni ha nem egyezik
  if (selected_positions.every(position => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return
  
  const newGameState = {...gameState}

  [newGameState.card_positions[selected_positions[0]], newGameState.card_positions[selected_positions[1]]] = [newGameState.card_positions[selected_positions[1]], newGameState.card_positions[selected_positions[0]]]

  const roleHistory = {
    ...newGameState.actual_scene,
    swapped_player_cards: selected_positions.slice(0, 2),
  }

  newGameState.players[token].role_history = roleHistory

  //TODO action_history
  newGameState.action_history.push({
    scene_title: "TROUBLEMAKER",
    scene_number: 61,
  });

  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY swapped cards',
  }))

  return newGameState
};