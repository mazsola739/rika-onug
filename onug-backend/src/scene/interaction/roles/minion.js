const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.minion = () => {
  const playerCards = collectCardInfo(gameState.players);
  const minionPlayer = getPlayersByRoleIds(playerCards, [7]);

  return minionPlayer;
};
