const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const {
  getTokensByRoleIds,
  getCardIdsByPositions,
  getPlayerNumbersWithNonMatchingTokens,
} = require("../utils");
const { centerCardPositions } = require("../constants");

//TODO doppelganger instant action
//? INFO: Seer (2) - Looks at one player's card (not her own) or two cards from the center
exports.seer = (gameState) => {
  const newGameState = { ...gameState };
  const role_interactions = [];

  const seerTokens = getTokensByRoleIds(newGameState.players, [9]); //todo doppelganger
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, seerTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_center_cards: centerCardPositions,
    selectable_player_cards: selectablePlayerNumbers,
    card_or_mark_action: false,
  };

  seerTokens.forEach((token) => {
    newGameState.players[token].role_history = roleHistory;

    role_interactions.push({
      type: INTERACTION,
      title: "SEER",
      token,
      message: "interaction_seer",
      selectable_center_cards: centerCardPositions,
      selectable_player_cards: selectablePlayerNumbers,
      shielded_players: newGameState.shield,
      player_card_id: newGameState.players[token]?.card?.id,
      player_role: newGameState.players[token]?.card?.role,
      player_role_id: newGameState.players[token]?.card?.role_id,
      player_team: newGameState.players[token]?.card?.team,
      player_number: newGameState.players[token]?.player_number,
    });
  });

  newGameState.role_interactions = role_interactions;

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return newGameState;
};

exports.seer_response = (gameState, token, selected_positions) => {
  let showCards = [];
  if (selected_positions[0].includes("player_") && gameState.players[token].role_history.selectable_player_cards.includes(selected_positions[0])) {
    showCards = [selected_positions[0]];
  } else if ([selected_positions[0], selected_positions[1]].includes("center_") && [selected_positions[0], selected_positions[1]].every((position) => gameState.players[token].role_history.selectable_center_cards.includes(position))) {
    showCards = [selected_positions[0], selected_positions[1]];
  } else return gameState;

  const newGameState = { ...gameState };
  const role_interactions = [];

  showCards = getCardIdsByPositions(newGameState.card_positions, selected_positions);

  //todo see herself?
  if (showCards.some((showCard) => Object.values(showCard).includes(newGameState.players[token].card.id))) {
    newGameState.players[token].card.id = 0;
  }

  newGameState.players[token].role_history.show_cards = showCards;
  newGameState.players[token].role_history.card_or_mark_action = true;

  role_interactions.push({
    type: INTERACTION,
    title: "SEER",
    token,
    message: "interaction_seer2",
    show_cards: showCards,
    shielded_players: newGameState.shield,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  });

  newGameState.role_interactions = role_interactions;

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  newGameState.actual_scene.interaction = `The player ${
    newGameState.players[token].player_number
  } viewed card(s) on the next position(s): ${selected_positions.join(", ")}`;

  return newGameState;
};
