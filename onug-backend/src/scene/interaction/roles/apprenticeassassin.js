const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger
exports.apprenticeassassin = () => {
  const playerCards = collectCardInfo(gameState.players);
  const apprenticeassassinPlayer = getPlayersByCardIds(playerCards, [28]);

  return apprenticeassassinPlayer;
};
