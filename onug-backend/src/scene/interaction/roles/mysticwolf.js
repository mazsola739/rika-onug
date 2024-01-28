const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.mysticwolf = () => {
  const playerCards = collectCardInfo(gameState.players);
  const mysticwolfPlayer = getPlayersByCardIds(playerCards, [22]);

  return mysticwolfPlayer;
};
