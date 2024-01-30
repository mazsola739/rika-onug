const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const {
  findPlayersByRoleIds,
  getCardIdsByPlayerNumbers,
  getPlayerNumbersByTokens,
} = require("../utils");

exports.insomniac = (gameState) => {
  const newGameState = { ...gameState };
  const insomniacTokens = findPlayersByRoleIds(newGameState.players, [4]);
  const insomniacPlayerNumbers = getPlayerNumbersByTokens(
    newGameState.players,
    insomniacTokens
  );
  const showCards = getCardIdsByPlayerNumbers(
    newGameState.card_positions,
    insomniacPlayerNumbers
  );

  const roleHistory = {
    ...newGameState.actual_scene,
    card_or_mark_action: true,
  };

  insomniacTokens.forEach((token) => {
    role_interactions.push({
      type: INTERACTION,
      token,
      message: "INSOMNIAC",
      show_cards: showCards,
    });
  });

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return newGameState;
};
