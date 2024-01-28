const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.thecount = () => {
  const playerCards = collectCardInfo(gameState.players);
  const thecountPlayer = getPlayersByCardIds(playerCards, [39]);

  return thecountPlayer;
};
