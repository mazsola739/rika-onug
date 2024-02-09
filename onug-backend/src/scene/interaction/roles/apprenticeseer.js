const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getTokensByCardIds, getCardIdsByPositions } = require("../utils");
const { centerCardPositions } = require("../constants");

//TODO doppelganger instant action
//? INFO: Apprentice Seer - looks at one card from the center (not another players or her own)
exports.apprenticeseer = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const apprenticeseerTokens = getTokensByCardIds(newGameState.players, [18]);
 
  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: centerCardPositions,
    card_or_mark_action: false,
  }

  apprenticeseerTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      title: "APPRENTICE_SEER",
      token,
      message: "interaction_apprenticeseer",
      selectable_cards: centerCardPositions,
      shielded_players: newGameState.shield,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.apprenticeseer_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false ) return gameState
  
  const newGameState = {...gameState}
  const role_interactions = [];

  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]]);

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "APPRENTICE_SEER",
    token,
    message: "interaction_apprenticeseer2",
    show_cards: showCards,
    shielded_players: newGameState.shield,
  })
  
  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed card on the next position: ${[selected_positions[0]]}`

  return newGameState
};