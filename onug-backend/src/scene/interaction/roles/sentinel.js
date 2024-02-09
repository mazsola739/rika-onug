const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getTokensByRoleIds, getPlayerNumbersWithNonMatchingTokens, getPlayerTokenByPlayerNumber } = require("../utils");

//TODO doppelganger instant action
//? INFO: Sentinel - Place a Shield token on any other player's card; that card (not mark) cannot be looked at or moved
exports.sentinel = gameState => {
  const newGameState = { ...gameState };
  const role_interactions = [];

  const sentinelTokens = getTokensByRoleIds(newGameState.players, [25]); //todo doppelganger
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, sentinelTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    selectable_cards: selectablePlayerNumbers,
    card_or_mark_action: false,

  }

  sentinelTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      title: "SENTINEL",
      token,
      message: "interaction_sentinel",
      selectable_cards: selectablePlayerNumbers,
      shielded_players: newGameState.shield,
    })
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState;
};

exports.sentinel_response = (gameState, token, selected_positions, ws) => {
  if (selected_positions.every((position) => gameState.players[token].role_history.selectable_cards.includes(position)) === false) return gameState
  
  const newGameState = {...gameState}
  const role_interactions = [];

  newGameState.shield.push(selected_positions[0])

  const shieldedPlayers = newGameState.shield
  const shieldedPlayerTokens = shieldedPlayers.map(player => getPlayerTokenByPlayerNumber(newGameState.players, player)) 

  shieldedPlayerTokens.forEach((token) => {
    newGameState.players[token].card.shield = true
  })

  newGameState.players[token].role_history.shielded_card = selected_positions[0]

  role_interactions.push({
    type: INTERACTION,
    title: "SENTINEL",
    token,
    message: "interaction_sentinel2",
    shielded_card: selected_positions[0],
    shielded_players: newGameState.shield,
  })

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} placed shield on the next position: ${selected_positions[0]}`

  return newGameState
};