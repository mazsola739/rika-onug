const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.roleretriever = () => {
  const playerCards = collectCardInfo(gameState.players);
  const roleretrieverPlayer = getPlayersByCardIds(playerCards, [66]);

  return roleretrieverPlayer;
};
