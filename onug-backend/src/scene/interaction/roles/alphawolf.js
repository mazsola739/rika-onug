
//TODO doppelganger instant action
const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { collectCardInfo, getPlayersByCardIds, getPlayersWithMark, findNonWerewolfPlayers, getPlayersWithShield } = require("../utils");

exports.alphawolf = gameState => {
  const newGameState = {...gameState}
  const role_interactions = []

  const playerCards = collectCardInfo(newGameState.players);
  const tokens = getPlayersByCardIds(newGameState.players, [17])
  const playersWithMarkOfFear = getPlayersWithMark(newGameState.players, "mark_of_fear")
  const playersWithShield = getPlayersWithShield(newGameState.players)


  tokens.forEach(token => 
    role_interactions.push({
      type: INTERACTION,
      token,
      mark_of_fear: playersWithMarkOfFear.includes(token),
      message: "ALPHAWOLF",
      selectable_players: findNonWerewolfPlayers(playerCards),
      shield: playersWithShield.includes(token),
  }))

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return newGameState
};

exports.alphawolf_response = (gameState, selected_positions, ws) => {
  const newGameState = {...gameState}

  newGameState.action_history.push({
    scene_title: "ALPHA_WOLF",
    scene_number: 37,
  });

  [newGameState.card_positions.center_wolf, newGameState.card_positions[selected_positions[0]]] = [newGameState.card_positions[selected_positions[0]], newGameState.card_positions.center_wolf]

  ws.send(JSON.stringify({
    type: INTERACTION,
    message: 'SUCCESSFULLY swapped cards',
  }))

  return newGameState
};