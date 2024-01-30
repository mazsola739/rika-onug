const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { findPlayersByRoleIds, getCardIdsByPlayerNumbers, getPlayerNumbersByTokens } = require("../utils");
//! new team
exports.selfawarenessgirl = (gameState) => {
  const newGameState = { ...gameState }
  const role_interactions = [];

  const selfawarenessgirlTokens = findPlayersByRoleIds(gameState.players, [67]);
  const selfawarenessgirlPlayerNumbers = getPlayerNumbersByTokens(gameState.players, selfawarenessgirlTokens);
  const showCards = getCardIdsByPlayerNumbers(gameState.card_positions, selfawarenessgirlPlayerNumbers);

  const roleHistory = {
    ...newGameState.actual_scene,
    card_or_mark_action: true,
  }

  selfawarenessgirlTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "selfawarenessgirl_interaction",
      flippable_cards: showCards,
    })
  })

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return role_interactions;
};
