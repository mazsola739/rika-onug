//wolf center card swap to any non werewolf card - update wolf center card & selected player card
//TODO doppelganger instant action
const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { collectCardInfo, getPlayersByCardIds, getPlayersWithMark, findNonWerewolfPlayers, getPlayersWithShield, getPlayersByRoleIds } = require("../utils");

exports.alphawolf = gameState => {
  const role_interactions = []
  const playerCards = collectCardInfo(gameState.players);
  const tokens = getPlayersByCardIds(gameState.players, [17])
  const playersWithMarkOfFear = getPlayersWithMark(gameState.players, "mark_of_fear")
  const playersWithShield = getPlayersWithShield(gameState.players)


  tokens.forEach(token => 
    role_interactions.push({
      type: INTERACTION,
      token,
      mark_of_fear: playersWithMarkOfFear.includes(token),
      message: "ALPHAWOLF",
      selectable_players: findNonWerewolfPlayers(playerCards),
      shield: playersWithShield.includes(token),
  }))

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return role_interactions
};

/* exports.doppelganger_alphawolf = gameState => {
  const role_interactions = []
  const playerCards = collectCardInfo(gameState.players);
  const tokens = getPlayersByRoleIds(gameState.players, [17])


  tokens.forEach(token => 
    role_interactions.push({
      type: INTERACTION,
      token,
      mark_of_fear: gameState.mark_of_fear,
      message: "ALPHAWOLF",
      selectable_players: findNonWerewolfPlayers(playerCards),
      shield: gameState.shield,
  }))

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return role_interactions
}; */

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

  //? save into card hitory: scene, role player, selected player
  //!save new player card
  //!save new wolfcard
  //*send message to the role player successfully changed
};