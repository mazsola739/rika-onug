const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.apprenticeassassin = () => {
  const playerCards = collectCardInfo(gameState.players);
  const apprenticeassassinPlayer = getPlayersByRoleIds(playerCards, [28]);

  return apprenticeassassinPlayer;
};
