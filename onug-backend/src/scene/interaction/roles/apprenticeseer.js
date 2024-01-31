

  const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { findPlayersByCardIds, getCardIdsByPositions } = require("../utils");
const { centerCardPositions } = require("../constants");

//TODO doppelganger instant action
//? INFO: Apprentice Seer - looks at one card from the center (not another players or her own)
exports.apprenticeseer = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const apprenticeseerTokens = findPlayersByCardIds(newGameState.players, [9]);
 
  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: centerCardPositions,
    card_or_mark_action: false,
  }

  apprenticeseerTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_apprenticeseer",
      selectable_center_cards: centerCardPositions,
      selectable_player_cards: selectablePlayerNumbers,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.apprenticeseer_response = (gameState, token, selected_positions, ws) => {
  //TODO kezelni ha nem egyezik + kibogozni az ellenőrzést
  if (selected_positions.every(position => gameState.players[token].role_history.selectable_center_cards.includes(position)) === false 
  && selected_positions.every(position => gameState.players[token].role_history.selectable_player_cards.includes(position)) === false ) return
  
  const newGameState = {...gameState}
  const role_interactions = [];

  const showCards = getCardIdsByPositions(newGameState.card_positions, selected_positions);

  const roleHistory = {
    ...newGameState.actual_scene,
    show_cards: showCards,
    card_or_mark_action: true,
  }

  apprenticeseerTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_apprenticeseer2",
      show_cards: showCards,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  //TODO action_history
  newGameState.action_history.push({
    scene_title: "SEER",
    scene_number: 46,
  });

  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY showed cards',
  }))

  return newGameState
};