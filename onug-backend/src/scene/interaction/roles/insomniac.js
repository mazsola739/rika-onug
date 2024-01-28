const { collectCardInfo, getPlayersByRoleIds } = require("../utils");

exports.insomniac = () => {
  const playerCards = collectCardInfo(gameState.players);
  const insomniacPlayer = getPlayersByRoleIds(playerCards, [4]);

  return insomniacPlayer;
};
