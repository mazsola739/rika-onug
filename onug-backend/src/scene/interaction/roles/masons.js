const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { getPlayerNumbersWithMatchingTokens } = require("../utils");

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
exports.masons = (gameState, tokens) => {
  const newGameState = { ...gameState };
  const role_interactions = [];

  const masonPlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, tokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    card_or_mark_action: false,
  };

  tokens.forEach((token) => {
    newGameState.players[token].role_history = roleHistory;

    role_interactions.push({
      type: INTERACTION,
      title: "MASONS",
      token,
      message: "interaction_masons",
      masons: masonPlayerNumbers,
      shielded_players: newGameState.shield,
    });

    newGameState.actual_scene.interaction = `The player ${newGameState.players[token].player_number} saw mason position(s): player ${masonPlayerNumbers.join(', ')}`
  });

  newGameState.role_interactions = role_interactions

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return newGameState;
};
