const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
const { werewolvesAndDreamWolfIds } = require("../constants");
const { findPlayersByRoleIds, getPlayerNumbersWithMatchingTokens } = require("../utils");

//? INFO: Minion - All Werewolf team (not Minion/Squire) stick up their thumb for him to see
exports.minion = gameState => {
  const newGameState = {...gameState}
  const role_interactions = [];

  const minionTokens = findPlayersByRoleIds(newGameState.players, [7]);
  const werewolfTokens = findPlayersByRoleIds(newGameState.players, werewolvesAndDreamWolfIds);
  const werewolfPlayerNumbers = getPlayerNumbersWithMatchingTokens(gameState.players, werewolfTokens);

  const roleHistory = {
    ...newGameState.actual_scene,
    werewolf_cards: werewolfPlayerNumbers,
    card_or_mark_action: false,
  }

  minionTokens.forEach((token) =>{
    newGameState.players[token].role_history = roleHistory

    role_interactions.push({
      type: INTERACTION,
      token,
      message: "interaction_minion",
      werewolf_cards: werewolfPlayerNumbers,
    })
  });

  logInfo(`role_interactions: ${JSON.stringify(role_interactions)}`);

  return newGameState;
};
