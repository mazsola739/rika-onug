const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getTokensByRoleIds, getPlayerNumbersWithMatchingTokens, getPlayerNumbersWithNonMatchingTokens, getCardIdsByPlayerNumbers } = require("../utils");

//TODO doppelganger instant action
//? INFO: Robber - Swaps his card for any other player’s card (not center) which he then looks at
exports.robber = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const robberTokens = getTokensByRoleIds(newGameState.players, [8]); //todo doppelganger
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, robberTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
    card_or_mark_action: false,
  }

  robberTokens.forEach((token) => {
    if (!newGameState.players[token].card.shield) {
      newGameState.players[token].role_history = roleHistory

      role_interactions.push({
        type: INTERACTION,
        title: "ROBBER",
        token,
        message: "interaction_robber",
        selectable_cards: selectablePlayerNumbers,
        shielded_players: newGameState.shield,
        player_card_id: newGameState.players[token]?.card?.id,
        player_role: newGameState.players[token]?.card?.role,
        player_role_id: newGameState.players[token]?.card?.role_id,
        player_team: newGameState.players[token]?.card?.team,
        player_number: newGameState.players[token]?.player_number,
      })
    } else if (newGameState.players[token].card.shield) {
      role_interactions.push({
        type: INTERACTION,
        title: "ROBBER",
        token,
        message: "interaction_shielded",
        shielded_players: newGameState.shield,
        player_card_id: newGameState.players[token]?.card?.id,
        player_role: newGameState.players[token]?.card?.role,
        player_role_id: newGameState.players[token]?.card?.role_id,
        player_team: newGameState.players[token]?.card?.team,
        player_number: newGameState.players[token]?.player_number,
      })
      
      newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} has shield, can't swap their card`
    }
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.robber_response = (gameState, token, selected_positions) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  
  const newGameState = {...gameState}
  const role_interactions = [];

  const robberPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);


  const playerCard = { ...newGameState.card_positions[robberPlayerNumber] };
  const selectedCard = { ...newGameState.card_positions[selected_positions[0]] };
  
  newGameState.card_positions[robberPlayerNumber] = selectedCard;
  newGameState.card_positions[selected_positions[0]] = playerCard;

  newGameState.players[token].card.id = newGameState.card_positions[robberPlayerNumber].id;
  newGameState.players[token].card.team = newGameState.card_positions[robberPlayerNumber].team;

  const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, robberPlayerNumber);

  newGameState.players[token].role_history.swapped_cards = [selected_positions[0], `player_${newGameState.players[token].player_number}`]
  newGameState.players[token].role_history.show_cards = showCards
  newGameState.players[token].role_history.card_or_mark_action = true

  role_interactions.push({
    type: INTERACTION,
    title: "ROBBER",
    token,
    message: "interaction_robber2",
    show_cards: showCards,
    shielded_players: newGameState.shield,
    player_card_id: newGameState.players[token]?.card?.id,
    player_role: newGameState.players[token]?.card?.role,
    player_role_id: newGameState.players[token]?.card?.role_id,
    player_team: newGameState.players[token]?.card?.team,
    player_number: newGameState.players[token]?.player_number,
  })
  
  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} swapped their card with ${selected_positions[0]} and then viewed their new card`

  return newGameState
};