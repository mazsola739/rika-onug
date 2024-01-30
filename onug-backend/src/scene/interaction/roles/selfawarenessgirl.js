const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const {
  findPlayersByRoleIds,
  getCardIdsByPlayerNumbers,
  getPlayerNumbersByTokens,
} = require("../utils");

exports.selfawarenessgirl = (gameState) => {
  const role_interactions = [];
  const selfawarenessgirlTokens = findPlayersByRoleIds(gameState.players, [67]);
  const selfawarenessgirlPlayerNumbers = getPlayerNumbersByTokens(
    gameState.players,
    selfawarenessgirlTokens
  );
  const flippableCards = getCardIdsByPlayerNumbers(
    gameState.card_positions,
    selfawarenessgirlPlayerNumbers
  );

  selfawarenessgirlTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "SELF_AWARENESS_GIRL",
      flippable_cards: flippableCards,
    })
  );

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return role_interactions;
};
