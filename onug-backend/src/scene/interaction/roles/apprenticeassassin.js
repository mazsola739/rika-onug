const { INTERACTION } = require("../../../constant/ws");
const { logInfo } = require("../../../log");
//TODO doppelganger
exports.apprenticeassassin = () => {
  const playerCards = collectCardInfo(gameState.players);
  const apprenticeassassinPlayer = getPlayersByCardIds(playerCards, [28]);

  return apprenticeassassinPlayer;
};
