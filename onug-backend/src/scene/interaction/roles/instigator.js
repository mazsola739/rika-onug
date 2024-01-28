const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.instigator = () => {
  const playerCards = collectCardInfo(gameState.players);
  const instigatorPlayer = getPlayersByCardIds(playerCards, [34]);

  return instigatorPlayer;
};
