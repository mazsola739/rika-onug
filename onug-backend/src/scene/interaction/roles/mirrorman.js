const { collectCardInfo, getPlayersByCardIds } = require("../utils");

exports.mirrorman = () => {
  const playerCards = collectCardInfo(gameState.players);
  const mirrormanPlayer = getPlayersByCardIds(playerCards, [64]);

  return mirrormanPlayer;
};
