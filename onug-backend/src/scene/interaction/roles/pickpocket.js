const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.pickpocket = () => {
  const playerCards = collectCardInfo(gameState.players);
  const pickpocketPlayer = getPlayersByCardIds(playerCards, [36]);

  return pickpocketPlayer;
};
