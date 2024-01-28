const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.priest = () => {
  const playerCards = collectCardInfo(gameState.players);
  const priestPlayer = getPlayersByCardIds(playerCards, [37]);

  return priestPlayer;
};
