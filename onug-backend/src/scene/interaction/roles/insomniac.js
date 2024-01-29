const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const {
  findPlayersByRoleIds,
  getCardIdsByPlayerNumbers,
  getPlayerNumbersByTokens,
} = require("../utils");

exports.insomniac = (gameState) => {
  const role_interactions = [];
  const insomniacTokens = findPlayersByRoleIds(gameState.players, [4]);
  const insomniacPlayerNumbers = getPlayerNumbersByTokens(
    gameState.players,
    insomniacTokens
  );
  const flippableCards = getCardIdsByPlayerNumbers(
    gameState.card_positions,
    insomniacPlayerNumbers
  );

  insomniacTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "INSOMNIAC",
      flippable_cards: flippableCards,
    })
  );

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`)

  return role_interactions;
};
