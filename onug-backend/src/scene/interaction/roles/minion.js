const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { werewolvesAndDreamWolfIds } = require("../constants");
const {
  findPlayersByRoleIds,
  getPlayerNumbersByTokens,
  getRolePositions,
} = require("../utils");

exports.minion = (gameState) => {
  const role_interactions = [];
  const minionTokens = findPlayersByRoleIds(gameState.players, [7]);
  const werewolfTokens = findPlayersByRoleIds(
    gameState.players,
    werewolvesAndDreamWolfIds
  );
  const werewolfPlayerNumbers = getPlayerNumbersByTokens(
    gameState.players,
    werewolfTokens
  );
  const flippableCards = getRolePositions(werewolfPlayerNumbers, 15);

  minionTokens.forEach((token) =>
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "MINION",
      flippable_cards: flippableCards,
    })
  );

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return role_interactions;
};
