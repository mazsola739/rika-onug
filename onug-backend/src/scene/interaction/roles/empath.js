const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.empath = () => {
  const playerCards = collectCardInfo(gameState.players);
  const empathPlayer = getPlayersByCardIds(playerCards, [77]);

  return empathPlayer;
};
