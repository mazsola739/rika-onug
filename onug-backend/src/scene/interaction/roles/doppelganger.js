const { collectCardInfo, getPlayersByCardIds } = require("../utils");

exports.doppelganger = () => {
  const playerCards = collectCardInfo(gameState.players);
  const doppelgangerPlayer = getPlayersByCardIds(playerCards, [1]);

  return doppelgangerPlayer;
};
