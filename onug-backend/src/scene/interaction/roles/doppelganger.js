const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getTokensByOriginalIds } = require("../../narration/utils");
const { getPlayerNumbersWithNonMatchingTokens, getCardIdsByPositions } = require("../utils");

//? INFO: Doppelgänger - Looks at any other player's card and becomes that card. Does that action during but different time
exports.doppelganger = (gameState, tokens) => {
  const newGameState = { ...gameState };
  const role_interactions = [];

  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, getTokensByOriginalIds);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
    card_or_mark_action: false,
  }

  tokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      title: "DOPPELGÄNGER",
      token,
      message: "interaction_doppelganger",
      selectable_cards: selectablePlayerNumbers,
      shielded_players: newGameState.shield,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.doppelganger_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  
  const newGameState = {...gameState}
  const role_interactions = [];

  newGameState.players[token].card.role_id =  newGameState.card_positions[selected_positions[0]].id
  newGameState.players[token].card.role =   newGameState.card_positions[selected_positions[0]].role
  newGameState.players[token].card.team =   newGameState.card_positions[selected_positions[0]].team
  
  const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]]);

  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true
  newGameState.players[token].role_history.new_role_id = newGameState.players[token].card.role_id

  role_interactions.push({
    type: INTERACTION,
    title: "DOPPELGÄNGER",
    token,
    message: "interaction_doppelganger2",
    show_cards: showCards,
    new_role_id: newGameState.players[token].card.role_id,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} copied card on the next position: ${selected_positions[0]}`

  return newGameState
};

