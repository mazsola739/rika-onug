const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const {
  findPlayersByRoleIds,
  getPlayerNumbersWithMatchingTokens,
  getRolePositions,
} = require("../utils");

exports.apprenticetanner = gameState => {
  const role_interactions = [];
  const apprenticetannerTokens = findPlayersByRoleIds(gameState.players, [71]);
  const tannerTokens = findPlayersByRoleIds(gameState.players, [10]);
  const tannerPlayerNumbers = getPlayerNumbersWithMatchingTokens(
    gameState.players,
    tannerTokens
  );
  const flippableCards = getRolePositions(tannerPlayerNumbers, 10);

  apprenticetannerTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "APPRENTICE_TANNER",
      flippable_cards: flippableCards,
    })
  );

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return role_interactions;
};
