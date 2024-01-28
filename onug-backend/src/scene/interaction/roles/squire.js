const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.squire = () => {
  const playerCards = collectCardInfo(gameState.players);
  const squirePlayer = getPlayersByRoleIds(playerCards, [83]);

  return squirePlayer;
};
