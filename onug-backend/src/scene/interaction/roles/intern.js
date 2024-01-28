const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.intern = () => {
  const playerCards = collectCardInfo(gameState.players);
  const internPlayer = getPlayersByRoleIds(playerCards, [62]);

  return internPlayer;
};
