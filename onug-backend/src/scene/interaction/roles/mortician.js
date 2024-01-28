const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.mortician = () => {
  const playerCards = collectCardInfo(gameState.players);
  const morticianPlayer = getPlayersByCardIds(playerCards, [49]);

  return morticianPlayer;
};
