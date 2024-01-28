const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.rascal = () => {
  const playerCards = collectCardInfo(gameState.players);
  const rascalPlayer = getPlayersByCardIds(playerCards, [52]);

  return rascalPlayer;
};
