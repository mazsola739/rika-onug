const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const {
  findPlayersByRoleIds,
  getPlayerNumbersByTokens,
  getRolePositions,
} = require("../utils");
const { masonIds } = require("../constants");

exports.masons = (gameState) => {
  const role_interactions = [];
  const masonTokens = findPlayersByRoleIds(gameState.players, masonIds);
  const masonPlayerNumbers = getPlayerNumbersByTokens(
    gameState.players,
    masonTokens
  );
  const flippableCards = getRolePositions(masonPlayerNumbers, 5);

  masonTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "MASONS",
      flippable_cards: flippableCards,
    })
  );

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return role_interactions;
};
