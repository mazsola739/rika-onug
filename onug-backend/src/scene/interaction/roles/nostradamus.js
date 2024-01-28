const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger same result as nostradamus
exports.nostradamus = () => {
  const playerCards = collectCardInfo(gameState.players);
  const nostradamusPlayer = getPlayersByRoleIds(playerCards, [80]);

  return nostradamusPlayer;
};
