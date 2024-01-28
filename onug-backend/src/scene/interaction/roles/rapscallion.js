const { collectCardInfo, getPlayersByCardIds } = require("../utils");
//TODO doppelganger instant action
exports.rapscallion = () => {
  const playerCards = collectCardInfo(gameState.players);
  const rapscallionPlayer = getPlayersByCardIds(playerCards, [65]);

  return rapscallionPlayer;
};
