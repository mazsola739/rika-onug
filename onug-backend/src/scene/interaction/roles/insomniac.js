const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getCardIdsByPlayerNumbers, getPlayerNumbersWithMatchingTokens, getTokensByRoleIds } = require("../utils");

//? INFO: Insomniac – Looks at her own card, but does not gain its power, just the team alliance. Can’t if it has a Shield on it
exports.insomniac = gameState => {
  const newGameState = { ...gameState }
  const role_interactions = [];

  const insomniacTokens = getTokensByRoleIds(newGameState.players, [4]);

  insomniacTokens.forEach((token) => {
    if (!newGameState.players[token].card.shield) {
      const insomniacPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, [token]);
      const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, insomniacPlayerNumbers);

      const roleHistory = {
        ...newGameState.actual_scene,
        show_cards: showCards,
        card_or_mark_action: true,
      }
      
      newGameState.players[token].role_history = roleHistory
      newGameState.players[token].card.team = newGameState.card_positions[`player_${insomniacPlayerNumbers[0]}`]?.team

      role_interactions.push({
        type: INTERACTION,
        title: "INSOMNIAC",
        token,
        message: "interaction_insomniac",
        show_cards: showCards,
        shielded_players: newGameState.shield,
      })

      newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} viewed their card`
    } else if (newGameState.players[token].card.shield) {
      role_interactions.push({
        type: INTERACTION,
        title: "INSOMNIAC",
        token,
        message: "interaction_shielded",
        shielded_players: newGameState.shield,
      })
      
      newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} has shield, can't view their card`
    }
  })
  
  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return newGameState;
};
