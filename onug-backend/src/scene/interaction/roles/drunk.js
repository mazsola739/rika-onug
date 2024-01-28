const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.drunk = () => {
  const playerCards = collectCardInfo(gameState.players);
  const drunkPlayer = getPlayersByCardIds(playerCards, [2]);

  return drunkPlayer;
};
