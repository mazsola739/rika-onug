const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { findPlayersByCardIds, getCardIdsByPositions } = require("../utils");
const { centerCardPositions } = require("../constants");

//TODO doppelganger instant action
//? INFO: Seer (2) - Looks at one player's card (not her own) or two cards from the center
exports.seer = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const seerTokens = findPlayersByCardIds(newGameState.players, [9]);
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, seerTokens);


  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_center_cards: centerCardPositions,
    selectable_player_cards: selectablePlayerNumbers,
    card_or_mark_action: true,
  }

  seerTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_seer",
      selectable_center_cards: centerCardPositions,
      selectable_player_cards: selectablePlayerNumbers,
    })
  });

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.seer_response = (gameState, token, selected_positions, ws) => {
  //TODO kezelni ha nem egyezik + kibogozni az ellenőrzést
  if (selected_positions.every(position => gameState.players[token].role_history.selectable_center_cards.includes(position)) === false 
  || selected_positions.every(position => gameState.players[token].role_history.selectable_player_cards.includes(position)) === false ) return
  
  const newGameState = {...gameState}

  const showCards = getCardIdsByPositions(newGameState.card_positions, selected_positions);

  const roleHistory = {
    ...newGameState.actual_scene,
    show_cards: showCards,
  }

  seerTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_seer2",
      show_cards: showCard,
    })
  });

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