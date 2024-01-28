const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.evilometer = () => {
  const playerCards = collectCardInfo(gameState.players);
  const evilometerPlayer = getPlayersByRoleIds(playerCards, [58]);

  return evilometerPlayer;
};
