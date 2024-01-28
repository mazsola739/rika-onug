const { collectCardInfo, getPlayersByRoleIds } = require("../utils");
//TODO doppelganger
exports.marksman = () => {
  const playerCards = collectCardInfo(gameState.players);
  const marksmanPlayer = getPlayersByRoleIds(playerCards, [35]);

  return marksmanPlayer;
};
