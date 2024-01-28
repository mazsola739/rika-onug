const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.flipper = () => {
  const playerCards = collectCardInfo(gameState.players);
  const flipperPlayer = getPlayersByCardIds(playerCards, [59]);

  return flipperPlayer;
};
