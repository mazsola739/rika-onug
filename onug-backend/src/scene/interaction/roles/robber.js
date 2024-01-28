const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.robber = () => {
  const playerCards = collectCardInfo(gameState.players);
  const robberPlayer = getPlayersByCardIds(playerCards, [8]);

  return robberPlayer;
};
