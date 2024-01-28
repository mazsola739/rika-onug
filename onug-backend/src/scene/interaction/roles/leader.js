const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.leader = () => {
  const playerCards = collectCardInfo(gameState.players);
  const leaderPlayer = getPlayersByRoleIds(playerCards, [48]);

  return leaderPlayer;
};
