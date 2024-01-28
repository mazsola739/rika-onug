const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.sentinel = () => {
  const playerCards = collectCardInfo(gameState.players);
  const sentinelPlayer = getPlayersByCardIds(playerCards, [25]);

  return sentinelPlayer;
};
