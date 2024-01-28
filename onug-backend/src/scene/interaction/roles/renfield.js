const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.renfield = () => {
  const playerCards = collectCardInfo(gameState.players);
  const renfieldPlayer = getPlayersByRoleIds(playerCards, [38]);

  return renfieldPlayer;
};
