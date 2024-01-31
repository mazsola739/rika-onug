const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { findPlayersByRoleIds, getPlayerNumbersWithMatchingTokens } = require("../utils");
const { masonIds } = require("../constants");

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
exports.masons = gameState => {
  const newGameState = { ...gameState };
  const role_interactions = [];

  const masonTokens = findPlayersByRoleIds(newGameState.players, masonIds);
  const masonPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, masonTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    card_or_mark_action: false,
  };

  masonTokens.forEach((token) => {
    newGameState.players[token].role_history = roleHistory;

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_masons",
      masons: masonPlayerNumbers,
    });
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return newGameState;
};
